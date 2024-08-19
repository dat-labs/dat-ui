# Stage 1: Build the application
FROM node:19.9.0 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
# Copy source code
COPY . .
RUN yarn install

# Build the Next.js application
RUN yarn build

# Stage 2: Run the application
FROM node:19.9.0

# Set working directory
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/next.config.mjs ./

# Command to run the app
CMD ["yarn", "start"]