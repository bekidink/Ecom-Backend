# Use an official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json package-lock.json ./

# Install dependencies, including dev dependencies for TypeScript types
RUN npm install --include=dev

# Copy the rest of your application code
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
