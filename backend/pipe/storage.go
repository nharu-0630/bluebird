package pipe

import (
	"bytes"
	"io"
	"mime"
	"os"
	"path/filepath"
	"slices"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"github.com/nharu-0630/bluebird/config"
	storage_go "github.com/supabase-community/storage-go"
)

type Storage struct {
	client   *storage_go.Client
	bucketID string
}

func NewStorage(client *storage_go.Client, bucket string, public bool) *Storage {
	buckets, err := client.ListBuckets()
	if err != nil {
		bucketNames := make([]string, len(buckets))
		for i, bucket := range buckets {
			bucketNames[i] = bucket.Name
		}
		if !slices.Contains(bucketNames, bucket) {
			client.CreateBucket(bucket, storage_go.BucketOptions{
				Public: public,
			})
		}
	}
	return &Storage{
		client:   client,
		bucketID: bucket,
	}
}

func (s *Storage) UploadGraphql(relativePath string, upload graphql.Upload) (string, error) {
	mimeType := mime.TypeByExtension(filepath.Ext(relativePath))
	if mimeType == "" {
		mimeType = "application/octet-stream"
	}
	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, upload.File); err != nil {
		return "", err
	}
	_, err := s.client.UploadFile(s.bucketID, relativePath, buf, storage_go.FileOptions{
		ContentType: &mimeType,
	})
	if err != nil {
		return "", err
	}
	return relativePath, nil
}

func (s *Storage) UploadBytes(relativePath string, data []byte) (string, error) {
	mimeType := mime.TypeByExtension(filepath.Ext(relativePath))
	if mimeType == "" {
		mimeType = "application/octet-stream"
	}
	_, err := s.client.UploadFile(s.bucketID, relativePath, bytes.NewReader(data), storage_go.FileOptions{
		ContentType: &mimeType,
	})
	if err != nil {
		return "", err
	}
	return relativePath, nil
}

func (s *Storage) RemoveFile(relativePaths []string) error {
	_, err := s.client.RemoveFile(s.bucketID, relativePaths)
	return err
}

func (s *Storage) GetPublicUrl(relativePath string) string {
	return strings.ReplaceAll(s.client.GetPublicUrl(config.PoipikuBucketName, relativePath).SignedURL, os.Getenv("SUPABASE_INTERNAL_URL"), os.Getenv("HOST_NAME")+":"+os.Getenv("HOST_PORT")+"/supabase")
}
