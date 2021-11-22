# Deployment Guide

## Initial Requirements

- Docker must be installed locally on the computer you use to build and push docker images.

## Instructions

1. Make sure you are on the `development` branch: `git switch development`
2. Build the server docker image:

`./gradlew bootBuildImage --imageName=benhunterlearn/sir-server`

3. Verify the docker image was created: `docker images`
