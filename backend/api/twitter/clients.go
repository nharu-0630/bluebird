package twitter

import (
	"errors"
	"math"

	"github.com/nharu-0630/bluebird/api/twitter/model"
)

type Clients struct {
	Clients []*Client
}

func NewClients(clients []*Client) *Clients {
	return &Clients{
		Clients: clients,
	}
}

func (c *Clients) Execute(o model.Cmd, args map[string]interface{}) (map[string]interface{}, error) {
	clients := map[*Client]int{}
	for _, client := range c.Clients {
		if client.isGuest && !o.AllowGuest {
			continue
		}
		if _, ok := client.rateLimits[o.Name]; ok {
			clients[client] = client.rateLimits[o.Name].remaining
			if clients[client] == 0 {
				clients[client] = -1 * client.rateLimits[o.Name].reset
			}
		} else {
			clients[client] = math.MaxInt
		}
	}
	var maxClient *Client
	maxValue := math.MinInt
	for client, value := range clients {
		if value > maxValue {
			maxValue = value
			maxClient = client
		}
	}
	if maxValue == math.MinInt {
		return nil, errors.New("all clients are rate limited or not allowed")
	}
	return maxClient.Execute(o, args)
}
