FROM node:20

WORKDIR /app

#copy only package.json files
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#npm run start:dev in terminal inside docker container
CMD [ "npm", "run", "start:dev" ]