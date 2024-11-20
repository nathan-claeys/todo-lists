FROM node:23.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3006