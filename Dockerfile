FROM node:11-slim

# move global install to the node user
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# allows running npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin


# add Tini to handle signals correctly without having to alter upstream provided code
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# make the 'app' folder the current working directory
WORKDIR /app
# copy the project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# install project dependencies
RUN npm install

# define environment variable defaults
ENV REDIS_URL redis://:foobar@redis:6379
ENV REDISCLOUD_URL redis://:foobar@redis:6379
ENV NODE_ENV production

RUN chown node:node /app -R
USER node

HEALTHCHECK --interval=12s --timeout=12s --start-period=60s \
  CMD node healthcheck.js

# Run all commands through tini
ENTRYPOINT ["/tini", "--"]
# Run our specific program under Tini
CMD ["node server.js"]