# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Serve the build using a simple static server, install it if not already in your package.json
# For example, using serve:
RUN npm install -g serve

# Copy the entire project to the working directory
COPY . .

# Copy env file from the local folder to the Docker build context
COPY staging.env .env

# Build the React app
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000


# Command to run the app
# CMD ["serve", "-s", "build", "-l", "3000"]
CMD [ "serve", "-s", "dist" ]
# This serves the build directory on port 3000

# Run the React app
# CMD ["npm", "start"]
