FROM node:11

# make the 'app' folder the current working directory
WORKDIR /app

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# install project dependencies
RUN npm install

ENV REDIS_URL redis://:foobar@redis:6379
ENV REDISCLOUD_URL redis://:foobar@redis:6379
# Run app
CMD "npm run start-docker"