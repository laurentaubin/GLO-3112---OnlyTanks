FROM node:alpine

# Create work directory
WORKDIR /app

# Copy app source to work directory
COPY . .

# Install app dependencies
RUN npm install

# Build and run the app
CMD npm start serve