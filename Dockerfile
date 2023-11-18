#* ✈️ Production 
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm install -f --only=production

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]