package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

const address = "127.0.0.1:8080"

func main() {
	if len(os.Args) > 1 {
		if len(os.Args) != 2 || os.Args[1] != "health" {
			log.Fatal("usage: demo [health]")
		}
		client := http.Client{Timeout: time.Second}
		response, err := client.Get("http://" + address + "/healthz")
		if err != nil {
			log.Fatal(err)
		}
		defer response.Body.Close()
		if response.StatusCode != http.StatusOK {
			log.Fatalf("health check returned %d", response.StatusCode)
		}
		return
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		if _, err := io.WriteString(w, "ok\n"); err != nil {
			log.Print(err)
		}
	})
	server := http.Server{
		Addr:              address,
		Handler:           mux,
		ReadHeaderTimeout: time.Second,
		ReadTimeout:       2 * time.Second,
		WriteTimeout:      2 * time.Second,
		IdleTimeout:       10 * time.Second,
	}
	log.Fatal(server.ListenAndServe())
}
