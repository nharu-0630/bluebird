package twitter

import (
	"bytes"
	"encoding/json"
	"net/http"
	"time"
)

type TwitterAPIConfig struct {
	IntervalDelta time.Duration
	Cookies       map[string]string
}

type TwitterAPI struct {
	config       TwitterAPIConfig
	client       *http.Client
	lastCalledAt time.Time
}

func NewTwitterAPI(config TwitterAPIConfig) *TwitterAPI {
	return &TwitterAPI{config: config, client: &http.Client{}, lastCalledAt: time.Now()}
}

func (api *TwitterAPI) gql(method string, queryID string, operation string, variables map[string]interface{}, features map[string]interface{}) (map[string]interface{}, error) {
	params := map[string]interface{}{
		"queryId":   queryID,
		"features":  features,
		"variables": variables,
	}
	var data map[string]interface{}
	if method == "POST" {
		data = map[string]interface{}{
			"json": params,
		}
	} else {
		data = map[string]interface{}{
			"params": params,
		}
	}
	encodedData, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}
	body := bytes.NewBuffer(encodedData)
	req, err := http.NewRequest(method, GQL_API_ENDPOINT+"/"+queryID+"/"+operation, body)
	
}
