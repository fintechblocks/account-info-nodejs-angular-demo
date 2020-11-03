FROM node:8.16.0-alpine

WORKDIR /home/account-info-demo-app
COPY package*.json ./

RUN npm install && npm install -g @angular/cli@6.0.8

COPY . /home/account-info-demo-app
RUN ng build --prod --output-hashing none
RUN rm -rf ./node_modules

RUN cp -r /home/account-info-demo-app/dist /home/account-info-demo-app/deploy
WORKDIR /home/account-info-demo-app/deploy
RUN npm install

EXPOSE 4200
CMD ["node", "serve.js"]