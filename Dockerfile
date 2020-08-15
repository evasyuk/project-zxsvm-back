FROM node:12

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN cd /usr/src/app
RUN npm install

RUN npm rebuild sqlite3

EXPOSE 9119

CMD [ "npm", "run", "start" ]
