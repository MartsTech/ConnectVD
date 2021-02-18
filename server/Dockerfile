FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 8000
CMD [ "node", "dist/index.js" ]
USER node