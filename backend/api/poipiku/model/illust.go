package model

type Illust struct {
	ID          string
	Password    string
	User        *User
	Category    string
	Description string
	Images      *[]IllustImage
}

type User struct {
	ID          string
	Name        string
	Image       IllustImage
	ExternalURL string
	Description string
	IsFollowing bool
	Emojis      []string
	ItemCount   int
}

type IllustImage struct {
	URL    string
	Format string
	Data   []byte
}

type Illusts struct {
	User          User
	PinnedIllusts []Illust
	Illusts       []Illust
	HasNext       bool
}
