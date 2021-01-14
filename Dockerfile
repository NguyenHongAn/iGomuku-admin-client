FROM node:14

WORKDIR /admin

COPY . /admin

RUN npm install

CMD ["npm", "start"]