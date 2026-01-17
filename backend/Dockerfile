FROM node:20-alpine

WORKDIR /app

# copy package files
COPY package*.json ./

RUN npm install

# copy toàn bộ source
COPY . .

# build nestjs → tạo dist/
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
