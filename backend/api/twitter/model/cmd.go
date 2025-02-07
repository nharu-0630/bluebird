package model

type Cmd struct {
	Name          string
	AllowGuest    bool
	DefaultParams map[string]interface{}
	Args          map[string]interface{}
	Method        string
	Endpoint      string
	Parser        func(map[string]interface{}) (map[string]interface{}, error)
}
