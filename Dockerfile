# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source code
COPY . .

# Expose port (change if your server uses a different port)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
