FROM node:20-alpine
LABEL authors="GIMENEZ"

EXPOSE 3000

WORKDIR /syllogism-project/
COPY public/ /syllogism-project/public
COPY src/ /syllogism-project/src
COPY package.json /syllogism-project/

RUN npm install
CMD ["npm", "start"]