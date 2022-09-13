FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn --foline --fronze-lockfile --link-duplicates

COPY . .

EXPOSE 3001

CMD ["yarn", "run", "dev"]

