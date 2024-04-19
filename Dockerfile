FROM node:19.9.0
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD ["yarn", "run", "dev"]
