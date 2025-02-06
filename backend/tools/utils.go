package tools

import "encoding/json"

func FormatItems[T any, R any](items []T, formatter func(*T) (*R, error)) ([]*R, error) {
	formatted := make([]*R, 0, len(items))
	for _, item := range items {
		formattedItem, err := formatter(&item)
		if err != nil {
			return nil, err
		}
		formatted = append(formatted, formattedItem)
	}
	return formatted, nil
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
