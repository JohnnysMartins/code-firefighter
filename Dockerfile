FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yar.lock", "./"]
RUN npm install -g typescript yarn
RUN yarn install --production --silent && mv node_modules ../
RUN npm run build
COPY . .
EXPOSE 3000
CMD node dist/index.js