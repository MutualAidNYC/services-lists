FROM node:16.20.0

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copying source files
COPY . /usr/src/app

# Installing dependencies
RUN yarn install

# Building app
#RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"
