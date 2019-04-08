FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
RUN npm run build
COPY . /app