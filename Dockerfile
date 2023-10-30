# Build the Next.js app
FROM node:20.6.1-alpine as build-stage
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install dependencies based on the preferred package manager
COPY ./ ./

RUN npm i --force
RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start"]
