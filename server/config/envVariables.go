package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetEnvVariable(key string) string {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
