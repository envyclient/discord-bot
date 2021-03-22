FROM node:current-alpine3.13

# create the app directory
WORKDIR /app

# copy only the package files
COPY package.json package-lock.json /app/
RUN npm install

# copy the source
COPY . /app

CMD ["node", "index.js"]