package tools

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
