FROM node:lts-alpine3.15

WORKDIR /app

COPY package.json ./

RUN npm  cache clear --force
RUN npm config set registry "http://registry.npmjs.org" --global
RUN npm install -g npm@8.5.5
# RUN npm audit fix --force

COPY . .

EXPOSE 3000

CMD ["npm","start"]

# Checked