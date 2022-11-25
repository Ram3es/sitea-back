FROM node:18.12.1

ARG ENV

ENV ENV=${ENV}

RUN echo "Creating application with ENV=$ENV"

WORKDIR /app

COPY package.json /app/package.json

RUN npm install -g npm@9.1.2

RUN npm install --legacy-peer-deps

COPY . /app

EXPOSE 8080

RUN npm run build

CMD npm run start:${ENV}
