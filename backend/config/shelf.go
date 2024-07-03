package config

const ShelfItemIDPrefix = "sh_it_"
const ShelfCategoryIDPrefix = "sh_ca_"
const ShelfTagIDPrefix = "sh_ta_"
const ShelfLocationIDPrefix = "sh_lo_"

const ShelfFileResolverURI = "/shelf-file"

var AllowedShelfFileContentTypes = []string{
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/bmp",
}
