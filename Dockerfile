# # Stage 1: Build the application
# FROM node:19.9.0 AS builder

# # Set working directory
# WORKDIR /app

# # Install dependencies
# # Copy source code
# COPY . .
# RUN yarn install

# # Build the Next.js application
# RUN yarn run build

# CMD ["yarn", "start"]

FROM node:19.9.0
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD ["yarn", "run", "dev"]