FROM node

WORKDIR /weather-app

COPY . /weather-app/

CMD ["npm", "start"]