#* ✈️ Production 
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm install -f

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]