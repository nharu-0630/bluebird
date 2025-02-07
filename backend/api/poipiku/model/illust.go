package model

import "image"

type Illust struct {
	UserID      string
	UserName    string
	IllustID    string
	Password    string
	Description string
	Images      []IllustImage
}

type IllustImage struct {
	ImageURL string
	Image    image.Image
}
