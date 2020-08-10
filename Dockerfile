FROM node:12

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install typescript -g
RUN npm install
RUN tsc /usr/src/app/index.оs

EXPOSE 8881

CMD [ "node", "/usr/src/app/index.js" ]
