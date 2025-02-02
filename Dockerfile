FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install --only=production

COPY . .

EXPOSE 3003 3004 3005
CMD ["node", "index.js"]
