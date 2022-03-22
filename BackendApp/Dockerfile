FROM node:lts-alpine3.15

WORKDIR /server

COPY package.json ./

RUN npm  cache clear --force
RUN npm install source-map-resolve

COPY . .

EXPOSE 5000

CMD ["node","server.js"]

# Checked
