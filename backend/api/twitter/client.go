package twitter

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"time"

	"dario.cat/mergo"
	"github.com/google/uuid"
	"github.com/nharu-0630/bluebird/api/twitter/model"
	"go.uber.org/zap"
)

type Client struct {
	isGuest    bool
	authToken  string
	csrfToken  string
	guestToken string
	client     *http.Client
	uuid       string
	rateLimits map[string]*RateLimit
}

func NewAuthorizedClient(authToken string, csrfToken string) *Client {
	client := &Client{
		isGuest:    false,
		authToken:  authToken,
		csrfToken:  csrfToken,
		client:     &http.Client{Timeout: 10 * time.Second},
		rateLimits: make(map[string]*RateLimit),
	}
	client.initializeClientUUID()
	return client
}

func NewGuestClient() *Client {
	client := &Client{
		isGuest:    true,
		client:     &http.Client{Timeout: 10 * time.Second},
		rateLimits: make(map[string]*RateLimit),
	}
	client.initializeGuestToken()
	return client
}

func (c *Client) Execute(o model.Cmd, args map[string]interface{}) (map[string]interface{}, error) {
	zap.L().Info("Executing operation", zap.String("name", o.Name))
	params := o.DefaultParams
	if err := mergo.Merge(&params, map[string]interface{}{
		"variables": args,
	}); err != nil {
		return nil, err
	}
	res, err := c.gql(o.Method, o.Endpoint, o.Name, params)
	if err != nil {
		return nil, err
	}
	res, err = o.Parser(res)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (c *Client) gql(method string, endpoint string, name string, params map[string]interface{}) (map[string]interface{}, error) {
	zap.L().Debug("GQL request", zap.String("operation", name))
	// if _, ok := c.rateLimits[name]; ok {
	// 	if c.isGuest {
	// 		if c.rateLimits[name].remaining == 0 {
	// 			zap.L().Debug("Rate limit exceeded", zap.String("operation", name))
	// 			c.initializeGuestToken()
	// 		}
	// 	} else {
	// 		c.rateLimits[name].wait()
	// 	}
	// }
	if method == "POST" {
		return nil, nil
	} else if method == "GET" {
		encodedParams := ""
		for key, value := range params {
			encodedValue, err := json.Marshal(value)
			if err != nil {
				return nil, err
			}
			escapedValue := url.QueryEscape(string(encodedValue))
			encodedParams += key + "=" + escapedValue + "&"
		}
		encodedParams = encodedParams[:len(encodedParams)-1]
		req, err := http.NewRequest("GET", GQL_API_ENDPOINT+"/"+endpoint+"/"+name+"?"+encodedParams, nil)
		if err != nil {
			return nil, err
		}
		c.setHeaders(req)
		res, err := c.client.Do(req)
		if err != nil {
			return nil, err
		}
		defer res.Body.Close()
		if _, ok := c.rateLimits[name]; !ok {
			c.rateLimits[name] = &RateLimit{}
		}
		c.rateLimits[name].update(res.Header)
		zap.L().Debug("Rate limit", zap.Int("limit", c.rateLimits[name].limit), zap.Int("remaining", c.rateLimits[name].remaining), zap.Int("reset", c.rateLimits[name].reset))
		var resData map[string]interface{}
		err = json.NewDecoder(res.Body).Decode(&resData)
		if err != nil {
			return nil, err
		}
		if _, ok := resData["data"]; !ok {
			return nil, errors.New("response does not contain data")
		}
		return resData["data"].(map[string]interface{}), nil
	} else {
		return nil, nil
	}
}

func (c *Client) setHeaders(req *http.Request) {
	if c.isGuest {
		c.setGuestHeaders(req)
	} else {
		c.setAuthorizedHeaders(req)
	}
}

func (c *Client) setGuestHeaders(req *http.Request) {
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://x.com")
	req.Header.Add("referer", "https://x.com/")
	req.Header.Add("user-agent", USER_AGENT)
	req.Header.Add("x-guest-token", c.guestToken)
	req.Header.Add("x-twitter-active-user", "yes")
	req.Header.Add("x-twitter-client-language", "ja")
}

func (c *Client) setAuthorizedHeaders(req *http.Request) {
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://x.com")
	req.Header.Add("referer", "https://x.com/")
	req.Header.Add("user-agent", USER_AGENT)
	req.AddCookie(&http.Cookie{Name: "auth_token", Value: c.authToken})
	req.AddCookie(&http.Cookie{Name: "ct0", Value: c.csrfToken})
	req.Header.Add("x-client-uuid", c.uuid)
	req.Header.Add("x-csrf-token", c.csrfToken)
	req.Header.Add("x-twitter-active-user", "yes")
	req.Header.Add("x-twitter-auth-type", "OAuth2Session")
	req.Header.Add("x-twitter-client-language", "ja")
}

func (c *Client) initializeGuestToken() {
	zap.L().Debug("Initializing guest token")
	req, err := http.NewRequest("POST", "https://api.twitter.com/1.1/guest/activate.json", nil)
	if err != nil {
		panic(err)
	}
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://twitter.com")
	req.Header.Add("referer", "https://twitter.com/")
	req.Header.Add("user-agent", USER_AGENT)
	res, err := c.client.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()
	var resData map[string]interface{}
	err = json.NewDecoder(res.Body).Decode(&resData)
	if err != nil {
		panic(err)
	}
	c.guestToken = resData["guest_token"].(string)
	c.rateLimits = make(map[string]*RateLimit)
}

func (c *Client) initializeClientUUID() {
	zap.L().Debug("Initializing client UUID")
	clientUUID, err := uuid.NewRandom()
	if err != nil {
		panic(err)
	}
	c.uuid = clientUUID.String()
}
