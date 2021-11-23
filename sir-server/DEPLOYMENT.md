# Deployment Guide

## Initial Requirements

- Docker must be installed locally on the computer you use to build and push docker images.

## Build Instructions

1. Make sure you are on the `development` branch: `git switch development`
2. Change directory to server: `cd sir-server`
3. Build the server docker image (update the tag to the correct version number ex: 0.1, 0.2...):

  - `./gradlew bootBuildImage --imageName=benhunter/sir-server:0.0.1`
  - `docker tag benhunter/sir-server:0.0.1 benhunter/sir-server:latest`

3. Verify the docker image was created: `docker images`
4. Push the server image to Docker Hub:

- `docker push benhunter/sir-server:0.0.1`
- `docker push benhunter/sir-server:latest`

5. Change directory to the client: `cd sir-client`
6. Build the client docker image from the Dockerfile in `sir-client` (update the tag to the correct version number ex: 0.1, 0.2...):

  - `docker build -t benhunter/sir-client:0.0.1 .`
  - `docker tag benhunter/sir-client:0.0.1 benhunter/sir-client:latest`

7. Push the client image to Docker Hub:
 
  - `docker push benhunter/sir-client:0.0.1`
  - `docker push benhunter/sir-client:latest`
  
8. (TODO: Docker-Compose to setup the full stack app.)
9. (TODO: set environment variable ENV_DB_PASS on production server)

## Run locally

Run the client locally (for testing):

`docker run -it --rm -p 80:3000 benhunter/sir-client:0.0.1`

## Notes

- The server docker image will have a build date of "41 years ago". This is intentional for creating "Reproducible Builds". For more information see:
  - https://buildpacks.io/docs/features/reproducibility/ (search for "timestamps")
