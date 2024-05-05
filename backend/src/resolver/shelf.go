package resolver

import (
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/xyzyxJP/bluebird/src/model"
	"gorm.io/gorm"
)

type ShelfFileResolver struct {
	DB *gorm.DB
}

func NewShelfFileResolver(db *gorm.DB) *ShelfFileResolver {
	return &ShelfFileResolver{DB: db}
}

func (s ShelfFileResolver) Resolver(w http.ResponseWriter, req *http.Request) {
	tokenQuery := req.URL.Query().Get("token")
	if tokenQuery == "" {
		http.Error(w, "token is required", http.StatusBadRequest)
		return
	}
	token, err := jwt.Parse(tokenQuery, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, nil
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if !token.Valid {
		http.Error(w, "invalid token", http.StatusBadRequest)
		return
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		id := int64(claims["id"].(float64))
		exp := int64(claims["exp"].(float64))
		if exp < time.Now().Unix() {
			http.Error(w, "token is expired", http.StatusBadRequest)
			return
		}
		shelfImage := model.ShelfImage{}
		if err := s.DB.Where("id = ?", id).First(&shelfImage).Error; err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.Header().Set("Content-Type", "image/jpeg")
		w.Write(shelfImage.Image)
	}
}
