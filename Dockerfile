FROM node:15

ENV PORT 3000
ENV NEXT_PUBLIC_RESOURCES_API_KEY ${api_key}
ENV NEXT_PUBLIC_RESOURCES_BASE_ID ${base_id}

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN yarn install

# Copying source files
COPY . /usr/src/app

# Building app
#RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"
