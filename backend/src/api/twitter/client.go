package twitter

import (
	"encoding/json"
	"net/http"
	"net/url"
	"time"

	"github.com/google/uuid"
)

type TwitterClientConfig struct {
	IsGuestTokenEnabled bool
	AuthToken           string
	CsrfToken           string
}

type TwitterClient struct {
	config       TwitterClientConfig
	client       *http.Client
	guestToken   string
	clientUUID   string
	authToken    string
	csrfToken    string
	lastCalledAt time.Time
}

func NewTwitterClient(config TwitterClientConfig) *TwitterClient {
	client := &TwitterClient{config: config,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
		lastCalledAt: time.Now(),
	}
	if config.IsGuestTokenEnabled {
		client.initializeGuestToken()
	} else {
		client.initializeClientUUID()
		client.authToken = config.AuthToken
		client.csrfToken = config.CsrfToken
	}
	return client
}

func (c *TwitterClient) gql(method string, queryID string, operation string, params map[string]interface{}) (map[string]interface{}, error) {
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
		req, err := http.NewRequest("GET", GQL_API_ENDPOINT+"/"+queryID+"/"+operation+"?"+encodedParams, nil)
		if err != nil {
			return nil, err
		}
		c.setHeaders(req)
		res, err := c.client.Do(req)
		if err != nil {
			return nil, err
		}
		defer res.Body.Close()
		var resData map[string]interface{}
		err = json.NewDecoder(res.Body).Decode(&resData)
		if err != nil {
			return nil, err
		}
		return resData, nil
	} else {
		return nil, nil
	}
}

func (c *TwitterClient) setHeaders(req *http.Request) {
	if c.config.IsGuestTokenEnabled {
		c.setGuestHeaders(req)
	} else {
		c.setAuthorizedHeaders(req)
	}
}

func (c *TwitterClient) setGuestHeaders(req *http.Request) {
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://twitter.com")
	req.Header.Add("referer", "https://twitter.com/")
	req.Header.Add("user-agent", USER_AGENT)
	req.Header.Add("x-guest-token", c.guestToken)
	req.Header.Add("x-twitter-active-user", "yes")
	req.Header.Add("x-twitter-client-language", "ja")
}

func (c *TwitterClient) setAuthorizedHeaders(req *http.Request) {
	req.Header.Add("authorization", "Bearer "+BEARER_TOKEN)
	req.Header.Add("origin", "https://twitter.com")
	req.Header.Add("referer", "https://twitter.com/")
	req.Header.Add("user-agent", USER_AGENT)
	req.AddCookie(&http.Cookie{Name: "auth_token", Value: c.authToken})
	req.AddCookie(&http.Cookie{Name: "ct0", Value: c.csrfToken})
	req.Header.Add("x-client-uuid", c.clientUUID)
	req.Header.Add("x-csrf-token", c.csrfToken)
	req.Header.Add("x-twitter-active-user", "yes")
	req.Header.Add("x-twitter-auth-type", "OAuth2Session")
	req.Header.Add("x-twitter-client-language", "ja")
}

func (c *TwitterClient) initializeGuestToken() {
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
}

func (c *TwitterClient) initializeClientUUID() {
	clientUUID, err := uuid.NewRandom()
	if err != nil {
		panic(err)
	}
	c.clientUUID = clientUUID.String()
}
