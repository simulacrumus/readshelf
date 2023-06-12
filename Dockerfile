 #  Dockerfile for Node Express Backend & React
FROM node:18
# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install Dependencies
COPY package*.json ./
RUN npm ci --omit=dev
# Copy app source code
COPY . .
# Run backend
CMD ["node","index.js"]

# React
FROM node:18 AS build
WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY public/ public
COPY src/ src
RUN npm run build

FROM httpd:alpine
WORKDIR /var/www/html
COPY --from=build /build/build/ .