package main

import (
	"net/http"
	"os"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	_ "github.com/lib/pq"
	"github.com/nharu-0630/bluebird/api/twitter"
	"github.com/nharu-0630/bluebird/config"
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

func main() {
	zap.ReplaceGlobals(zap.New(zapcore.NewCore(zapcore.NewConsoleEncoder(zap.NewProductionEncoderConfig()), zapcore.AddSync(os.Stdout), zapcore.DebugLevel)))
	// Connect to the database
	dsn := "postgres://" + os.Getenv("SUPABASE_POSTGRES_USER") + ":" + os.Getenv("SUPABASE_POSTGRES_PASSWORD") + "@" + os.Getenv("SUPABASE_POSTGRES_HOST") + ":" + os.Getenv("SUPABASE_POSTGRES_PORT") + "/" + os.Getenv("SUPABASE_POSTGRES_DB")
	db, err := gorm.Open(postgres.New(postgres.Config{DSN: dsn, PreferSimpleProtocol: true}), &gorm.Config{})
	if err != nil {
		zap.L().Sugar().Fatal(err)
	}
	// For shelf
	db.AutoMigrate(&model.ShelfItem{}, &model.ShelfCategory{}, &model.ShelfTag{}, &model.ShelfLocation{}, &model.BucketFile{})
	db.Create(mock.MockShelfCategory())
	db.Create(mock.MockShelfTag())
	db.Create(mock.MockShelfLocation())

	storage := storage_go.NewClient(os.Getenv("SUPABASE_INTERNAL_URL")+"/storage/v1", os.Getenv("SUPABASE_ANON_KEY"), nil)
	buckets, err := storage.ListBuckets()
	if err != nil {
		zap.L().Sugar().Fatal(err)
	}
	bucketExists := false
	for _, bucket := range buckets {
		if bucket.Name == config.ShelfBucketName {
			bucketExists = true
			break
		}
	}
	if !bucketExists {
		_, err = storage.CreateBucket(config.ShelfBucketName, storage_go.BucketOptions{
			Public: true,
		})
		if err != nil {
			zap.L().Sugar().Warn(err)
		}
	}

	// For twitter
	db.AutoMigrate(&model.TwTweet{}, &model.TwUser{}, &model.TwQueryCache{})
	twAuthTokens := strings.Split(os.Getenv("TWITTER_AUTH_TOKEN"), ",")
	twCsrfTokens := strings.Split(os.Getenv("TWITTER_CSRF_TOKEN"), ",")
	if len(twAuthTokens) != len(twCsrfTokens) {
		zap.L().Sugar().Fatal("TWITTER_AUTH_TOKEN and TWITTER_CSRF_TOKEN must have the same number of elements")
	}
	twClients := make([]*twitter.Client, len(twAuthTokens))
	for i := range twAuthTokens {
		twClients[i] = twitter.NewAuthorizedClient(twAuthTokens[i], twCsrfTokens[i])
	}
	twPipe := graphql.NewTwPipe(db, twitter.NewClients(twClients))
	// For GraphQL
	port := os.Getenv("PORT")
	if port == "" {
		port = "9999"
	}
	srv := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: &graphql.Resolver{DB: db,
		Storage:  storage,
		TwClient: twPipe}}))
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true})
	handler := c.Handler(http.DefaultServeMux)
	http.Handle("/", srv)
	zap.L().Sugar().Fatal(http.ListenAndServe(":"+port, handler))
}
