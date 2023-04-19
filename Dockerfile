FROM node:18-alpine
COPY package.json .
RUN yarn
COPY . ./
RUN yarn build
CMD [ "yarn", "start" ]
