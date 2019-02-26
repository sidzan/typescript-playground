FROM mhart/alpine-node:latest

MAINTAINER Sijan Shrestha <sijanshrestha2@gmail.com>

WORKDIR /app
ADD . .

RUN npm install

EXPOSE 8889

CMD ["npm", "run", "start:prod"]
