FROM node:alpine
COPY . .
CMD node dist/index.js
