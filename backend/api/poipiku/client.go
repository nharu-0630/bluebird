package poipiku

import (
	"bytes"
	"encoding/json"
	"errors"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/nharu-0630/bluebird/api/poipiku/model"
)

type Client struct {
	token  string
	client *http.Client
}

func NewClient(token string) *Client {
	return &Client{
		token:  token,
		client: &http.Client{Timeout: 10 * time.Second},
	}
}

func (c *Client) FetchIllusts(userID string, pageIdx int) (*model.Illusts, error) {
	payload := "PG=" + strconv.Itoa(pageIdx) + "&ID=" + userID + "&KWD="
	req, err := http.NewRequest("GET", "https://poipiku.com/IllustListPcV.jsp?"+payload, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7")
	req.Header.Add("accept-language", "ja")
	req.Header.Add("referer", "https://poipiku.com/"+userID+"/")
	req.Header.Add("user-agent", USER_AGENT)
	req.AddCookie(&http.Cookie{Name: "POIPIKU_LK", Value: c.token})
	req.AddCookie(&http.Cookie{Name: "POIPIKU_CONTENTS_VIEW_MODE", Value: "1"})
	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	text := string(bytes.ToValidUTF8(body, []byte("�")))
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(text))
	if err != nil {
		return nil, err
	}

	illusts := &model.Illusts{}
	user, err := c.fetchUser(doc)
	if err != nil {
		return nil, err
	}
	illusts.User = *user
	illusts.User.ID = userID
	illusts.PinnedIllusts = []model.Illust{}
	illusts.Illusts = []model.Illust{}
	doc.Find("div.IllustThumb").Each(func(i int, s *goquery.Selection) {
		illust := model.Illust{
			ID:          strings.ReplaceAll(strings.Split(s.Find("a.IllustInfo").AttrOr("href", ""), "/")[2], ".html", ""),
			Category:    s.Find("a.CategoryInfo").Text(),
			Description: s.Find("span.IllustInfoDesc").Text(),
		}
		if strings.Contains(s.AttrOr("class", ""), "Pined") {
			illusts.PinnedIllusts = append(illusts.PinnedIllusts, illust)
		} else {
			illusts.Illusts = append(illusts.Illusts, illust)
		}
	})
	illusts.HasNext = doc.Find("a.PageBarItem").Last().AttrOr("href", "") != "/IllustListPcV.jsp?PG="+strconv.Itoa(pageIdx)+"&ID="+userID+"&KWD="
	return illusts, nil
}

func (c *Client) fetchUser(doc *goquery.Document) (*model.User, error) {
	user := &model.User{}
	user.Name = doc.Find("h2.UserInfoUserName").Text()
	userImageURL := strings.ReplaceAll(strings.ReplaceAll(doc.Find("a.UserInfoUserThumb").AttrOr("style", ""), "background-image: url('", ""), "')", "")
	userImage, err := c.fetchIllustImage("https:" + userImageURL)
	if err != nil {
		return nil, err
	}
	user.Image = *userImage
	user.ExternalURL = doc.Find("h3.UserInfoProfile").First().Find("a").AttrOr("href", "")
	user.Description = doc.Find("h3.UserInfoProfile").Eq(1).Text()
	user.IsFollowing = doc.Find("span.UserInfoCmdFollow.Selected").Length() > 0
	emojis := []string{}
	doc.Find("span.WaveButton").Each(func(i int, s *goquery.Selection) {
		emojis = append(emojis, s.AttrOr("alt", ""))
	})
	user.Emojis = emojis
	itemCount, err := strconv.Atoi(doc.Find("span.UserInfoStateItemNum").Text())
	if err != nil {
		return nil, err
	}
	user.ItemCount = itemCount
	return user, nil
}

func (c *Client) FetchIllust(userID string, illustID string, password string) (*model.Illust, error) {
	req, err := http.NewRequest("GET", "https://poipiku.com/"+userID+"/"+illustID+".html", nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7")
	req.Header.Add("accept-language", "ja")
	req.Header.Add("referer", "https://poipiku.com/"+userID+"/")
	req.Header.Add("user-agent", USER_AGENT)
	req.AddCookie(&http.Cookie{Name: "POIPIKU_LK", Value: c.token})
	req.AddCookie(&http.Cookie{Name: "POIPIKU_CONTENTS_VIEW_MODE", Value: "1"})
	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	text := string(bytes.ToValidUTF8(body, []byte("�")))
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(text))
	if err != nil {
		return nil, err
	}

	illust := &model.Illust{
		ID:       illustID,
		Password: password,
		Images:   &[]model.IllustImage{},
	}

	user, err := c.fetchUser(doc)
	if err != nil {
		return nil, err
	}
	illust.User = user
	illust.User.ID = userID

	illust.Category = doc.Find("h2.IllustItemCategory").Text()
	illust.Description = doc.Find("h1.IllustItemDesc").Text()

	file, err := c.fetchAppendFile(userID, illustID, password)
	if err != nil {
		return nil, errors.New("failed to fetch append file, maybe password is incorrect")
	}
	detailRegex := regexp.MustCompile(`showIllustDetail\((\d+), (\d+), (-?\d+)\)`)
	detailMatches := detailRegex.FindAllStringSubmatch(file, -1)
	imageURLs := make([]string, 0)
	for _, detailMatch := range detailMatches {
		source, err := c.fetchIllustDetail(detailMatch[1], detailMatch[2], detailMatch[3], password)
		if err != nil {
			continue
		}
		sourceRegex := regexp.MustCompile(`src=\"(.+?)\"`)
		sourceMatch := sourceRegex.FindStringSubmatch(source)
		if len(sourceMatch) < 2 {
			continue
		}
		imageURLs = append(imageURLs, "https:"+sourceMatch[1])
	}
	for _, imageURL := range imageURLs {
		img, err := c.fetchIllustImage(imageURL)
		if err != nil {
			continue
		}
		*illust.Images = append(*illust.Images, *img)
	}
	return illust, nil
}

func (c *Client) fetchIllustImage(url string) (*model.IllustImage, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("accept", "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8")
	req.Header.Add("referer", "https://poipiku.com/")
	req.Header.Add("user-agent", USER_AGENT)
	req.AddCookie(&http.Cookie{Name: "POIPIKU_LK", Value: c.token})
	req.AddCookie(&http.Cookie{Name: "POIPIKU_CONTENTS_VIEW_MODE", Value: "1"})
	res, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	_, format, err := image.DecodeConfig(bytes.NewReader(data))
	if err != nil {
		return nil, err
	}
	return &model.IllustImage{
		URL:    url,
		Format: format,
		Data:   data,
	}, nil
}

func (c *Client) fetchIllustDetail(userID string, illustID string, ad string, password string) (string, error) {
	payload := "ID=" + userID + "&TD=" + illustID + "&AD=" + ad + "&PAS=" + password
	req, err := http.NewRequest("POST", "https://poipiku.com/f/ShowIllustDetailF.jsp", bytes.NewBuffer([]byte(payload)))
	if err != nil {
		return "", err
	}
	req.Header.Add("accept", "application/json, text/javascript, */*; q=0.01")
	req.Header.Add("accept-language", "ja")
	req.Header.Add("origin", "https://poipiku.com")
	req.Header.Add("referer", "https://poipiku.com/"+userID+"/"+illustID+".html")
	req.Header.Add("user-agent", USER_AGENT)
	req.Header.Add("x-requested-with", "XMLHttpRequest")
	req.Header.Add("content-type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.AddCookie(&http.Cookie{Name: "POIPIKU_LK", Value: c.token})
	req.AddCookie(&http.Cookie{Name: "POIPIKU_CONTENTS_VIEW_MODE", Value: "1"})
	res, err := c.client.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	var resData map[string]interface{}
	if err := json.Unmarshal(body, &resData); err != nil {
		return "", err
	}
	if _, ok := resData["html"]; !ok {
		return "", errors.New("response does not contain html")
	}
	return resData["html"].(string), nil
}

func (c *Client) fetchAppendFile(userID string, illustID string, password string) (string, error) {
	payload := "UID=" + userID + "&IID=" + illustID + "&PAS=" + password + "&MD=0&TWF=-1"
	req, err := http.NewRequest("POST", "https://poipiku.com/f/ShowAppendFileF.jsp", bytes.NewBuffer([]byte(payload)))
	if err != nil {
		return "", err
	}
	req.Header.Add("accept", "application/json, text/javascript, */*; q=0.01")
	req.Header.Add("accept-language", "ja")
	req.Header.Add("origin", "https://poipiku.com")
	req.Header.Add("referer", "https://poipiku.com/"+userID+"/"+illustID+".html")
	req.Header.Add("user-agent", USER_AGENT)
	req.Header.Add("x-requested-with", "XMLHttpRequest")
	req.Header.Add("content-type", "application/x-www-form-urlencoded; charset=UTF-8")
	req.AddCookie(&http.Cookie{Name: "POIPIKU_LK", Value: c.token})
	req.AddCookie(&http.Cookie{Name: "POIPIKU_CONTENTS_VIEW_MODE", Value: "1"})
	res, err := c.client.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	var resData map[string]interface{}
	if err := json.Unmarshal(body, &resData); err != nil {
		return "", err
	}
	if _, ok := resData["html"]; !ok {
		return "", errors.New("response does not contain html")
	}
	return resData["html"].(string), nil
}
