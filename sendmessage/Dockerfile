FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .  

EXPOSE 3003  

CMD ["node", "index.js"]
