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
	"strings"
	"time"

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

func (c *Client) FetchIllust(userID string, illustID string, password string) (*model.Illust, error) {
	illust := &model.Illust{
		UserID:   userID,
		IllustID: illustID,
		Password: password,
		Images:   []model.IllustImage{},
	}
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
	userNameRegex := regexp.MustCompile(`class="IllustUserName">(.+?)</h2>`)
	if userNameRegex.MatchString(text) {
		illust.UserName = userNameRegex.FindStringSubmatch(text)[1]
	} else {
		return nil, errors.New("user name not found")
	}
	descRegex := regexp.MustCompile(`class="IllustItemDesc" >(.+?)</h1>`)
	if descRegex.MatchString(text) {
		illust.Description = strings.ReplaceAll(descRegex.FindStringSubmatch(text)[1], "<br />", "\n")
	} else {
		return nil, errors.New("description not found")
	}
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
		illust.Images = append(illust.Images, *img)
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
	img, _, err := image.Decode(res.Body)
	if err != nil {
		return nil, err
	}
	return &model.IllustImage{
		ImageURL: url,
		Image:    img,
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
