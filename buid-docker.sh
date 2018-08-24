#!/usr/bin/env bash

echo "Building docker image..."
docker build -t remisa/express-mongo:1.0.0 .
