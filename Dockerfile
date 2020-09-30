FROM amd64/node:14.11.0-alpine

WORKDIR /app

RUN apk update

RUN apk add git bash python3 py3-pip \
    build-base
    
COPY . .

RUN npm install

RUN cd /app/client && npm install

EXPOSE 5000 3000

CMD ["npm", "run", "dev"]
