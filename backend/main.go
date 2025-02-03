package main

import (
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq"
	"github.com/nharu-0630/bluebird/api/twitter"
	"github.com/nharu-0630/bluebird/graphql"
	"github.com/nharu-0630/bluebird/mock"
	"github.com/nharu-0630/bluebird/model"
	"github.com/rs/cors"
	storage_go "github.com/supabase-community/storage-go"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const defaultPort = "3030"

func main() {
	zap.ReplaceGlobals(zap.New(zapcore.NewCore(zapcore.NewConsoleEncoder(zap.NewProductionEncoderConfig()), zapcore.AddSync(os.Stdout), zapcore.DebugLevel)))
	// Connect to the database
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.New(postgres.Config{DSN: dsn, PreferSimpleProtocol: true}), &gorm.Config{})
	if err != nil {
		zap.L().Sugar().Fatal(err)
	}
	// For shelf
	db.AutoMigrate(&model.ShelfItem{}, &model.ShelfCategory{}, &model.ShelfTag{}, &model.ShelfLocation{}, &model.BucketFile{})
	db.Create(mock.MockShelfCategory())
	db.Create(mock.MockShelfTag())
	db.Create(mock.MockShelfLocation())
	storage := storage_go.NewClient(os.Getenv("SUPABASE_URL")+"/storage/v1", os.Getenv("SUPABASE_TOKEN"), nil)
	if err != nil {
		zap.L().Sugar().Fatal(err)
	}
	// For twitter
	db.AutoMigrate(&model.TwitterUser{}, &model.TwitterTweet{}, &model.TwitterMedia{})
	twitterClient := twitter.NewClient(twitter.ClientConfig{
		IsGuestTokenEnabled: false,
		AuthToken:           os.Getenv("TWITTER_AUTH_TOKEN"),
		CsrfToken:           os.Getenv("TWITTER_CSRF_TOKEN")})
	// For GraphQL
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	srv := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: &graphql.Resolver{DB: db,
		Storage:       storage,
		TwitterClient: twitterClient}}))
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true})
	handler := c.Handler(http.DefaultServeMux)
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	zap.L().Sugar().Infof("connect to http://localhost:%s/ for GraphQL playground", port)
	http.Handle("/query", srv)
	zap.L().Sugar().Infof("connect to http://localhost:%s/query for GraphQL query", port)
	zap.L().Sugar().Fatal(http.ListenAndServe(":"+port, handler))
}
