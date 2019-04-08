FROM node:stretch
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . /app