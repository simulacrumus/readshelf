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

COPY client/package.json package.json
COPY client/package-lock.json package-lock.json
RUN npm ci

COPY client/public/ public
COPY client/src/ src
RUN npm run build

FROM httpd:alpine
WORKDIR /var/www/html
COPY --from=build /build/build/ .