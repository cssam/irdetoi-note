## irdetoi-note
FROM node:14
ENV NODE_ENV=production

# change to directory
WORKDIR /irdetoi-note

COPY ["package.json", "package-lock.json*", "./irdetoi-note/"]

RUN npm install --production

COPY . /irdetoi-note

EXPOSE 3040
CMD [ "node", "server.js" ]
