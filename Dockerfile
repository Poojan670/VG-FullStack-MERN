FROM node:alpine

WORKDIR /src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["nodemon"]