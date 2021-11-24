# Use NodeJs base image. It includes npm and node.
FROM node:16

# Using the default port of 'npm serve'.
EXPOSE 3000

# Set the location inside the image.
WORKDIR /app

# Best practice to run Node in production mode. May not be needed by the npm serve package.
ENV NODE_ENV="production"

# Install the client dependencies.
COPY package.json ./
RUN npm install

# Install the serve package that will be the server.
RUN npm install -g serve

# Copy the client source code.
COPY . .

# Build the client for production.
RUN npm run build

# Run the server when the container starts.
CMD ["serve", "-s", "build"]
