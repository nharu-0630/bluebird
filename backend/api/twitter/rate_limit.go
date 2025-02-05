package twitter

import (
	"net/http"
	"strconv"
	"time"
)

type RateLimit struct {
	limit     int
	remaining int
	reset     int
}

func (r *RateLimit) wait() {
	if r.remaining == 0 {
		t := time.Unix(int64(r.reset), 0)
		time.Sleep(time.Until(t))
	}
}

func (r *RateLimit) update(header http.Header) {
	if limit := header.Get("x-rate-limit-limit"); limit != "" {
		r.limit, _ = strconv.Atoi(limit)
	}
	if remaining := header.Get("x-rate-limit-remaining"); remaining != "" {
		r.remaining, _ = strconv.Atoi(remaining)
	}
	if reset := header.Get("x-rate-limit-reset"); reset != "" {
		r.reset, _ = strconv.Atoi(reset)
	}
}
