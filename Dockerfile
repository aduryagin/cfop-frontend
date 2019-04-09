FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . /app
RUN npm run build
CMD [ "npm", "start" ]