FROM node:lts-alpine3.15

WORKDIR /app

COPY package.json ./

RUN npm  cache clear --force
RUN npm install source-map-resolve

COPY . .

EXPOSE 3000

CMD ["npm","start"]

# Checked