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

## Production server setup

1. Create instance on AWS Lightsail using Platform: "Linux/Unix", Blueprint: "OS Only" and "Amazon Linux 2".
2. Assign static IP address.
3. Add firewall rule to allow TCP 3001. Add ICMP Ping if you want to be able to ping the server.
4. SSH into the server console.
5. Install docker, docker-compose, and tmux.
 
```bash
sudo yum update -y  # Update everything. On a new server, the packages will already be up to date.

# Install docker
sudo amazon-linux-extras install docker
sudo service docker start  # start docker
sudo usermod -a -G docker ec2-user  # Add your user account to the group called 'docker'

# Install docker-compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose  # Set docker-compose as executable.

# Install tmux
sudo yum install tmux

exit  # Exit and reconnect to gain the docker group on your account.

tmux  # Start tmux so you can detach and re-attach to your terminal sessions.
# Tmux Guide: https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/

# Check that docker, docker-compose, and wget are installed.
docker info
docker-compose version
wget -v
```

6. Download the docker-compose file.

```bash
#  Get the docker-compose file.
wget https://raw.githubusercontent.com/AFC-Cohort-2-Serious-Incident-Report/SIR/development/sir-server/docker-compose.yml
ls  # Look for docker-compose.yml
```

7. Run it!

```bash
docker-compose up
``` 

## Upgrade the containers on the production server

```bash
docker-compose down
docker-compose pull
docker-compose up
```

## Notes

- The server docker image will have a build date of "41 years ago". This is intentional for creating "Reproducible Builds". For more information see:
  - https://buildpacks.io/docs/features/reproducibility/ (search for "timestamps")
- The production server must have the environment variable `ENV_DB_PASS`: `export ENV_DB_PASS=********`
