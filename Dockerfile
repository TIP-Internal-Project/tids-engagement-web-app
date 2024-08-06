# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Build the React app based on the environment variable
ARG REACT_APP_ENV
RUN npm run build:$REACT_APP_ENV

# Set the working directory to the build folder
WORKDIR /app/build

# Expose the port the app runs on
ENV PORT=8080
EXPOSE 8080

# Serve the React app using a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", ".", "-l", "8080"]
