# Deployment Guide

## Initial Requirements

- Docker must be installed locally on the computer you use to build and push docker images.

## Build Instructions

1. Make sure you are on the `development` branch: `git switch development`
2. Change directory to server: `cd sir-server`
3. Build the server docker image (update the tag to the correct version number ex: 0.1, 0.2...):

`./gradlew bootBuildImage --imageName=benhunterlearn/sir-server:0.0.1`

3. Verify the docker image was created: `docker images`
4. (TODO: add command to push image to Docker Hub)
5. Change directory to the client: `cd sir-client`
6. Build the client docker image from the Dockerfile in `sir-client` (update the tag to the correct version number ex: 0.1, 0.2...):

`docker build -t benhunterlearn/sir-client:0.0.1 .`

7. (TODO: Push images to Docker Hub)
8. (TODO: Docker-Compose to setup the full stack app.)

## Run locally

Run the client locally (for testing):

`docker run -it --rm -p 80:3000 benhunterlearn/sir-client:0.0.1`