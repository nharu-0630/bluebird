package tools

import "encoding/json"

func FormatItems[T any, R any](items []T, formatter func(T) R) []*R {
	formatted := make([]*R, 0, len(items))
	for _, item := range items {
		formattedItem := formatter(item)
		formatted = append(formatted, &formattedItem)
	}
	return formatted
}

func DecodeItem[T any](item interface{}) (*T, error) {
	data, err := json.Marshal(item)
	if err != nil {
		return nil, err
	}
	var res T
	err = json.Unmarshal(data, &res)
	if err != nil {
		return nil, err
	}
	return &res, nil
}

func EncodeItem[T any](item T) (map[string]interface{}, error) {
	data, err := json.Marshal(item)
	if err != nil {
		return nil, err
	}
	var res map[string]interface{}
	err = json.Unmarshal(data, &res)
	if err != nil {
		return nil, err
	}
	return res, nil
}
