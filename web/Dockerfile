FROM node:16

ENV REACT_APP_baseUrlReact = http://localhost:8080

WORKDIR /usr/src/app

RUN npm install nodemon -g

# Copying the package.json and package-lock.json files to the container at the working DIR
COPY package.json package-lock.json ./
RUN npm install

# Copying the rest of the files to the container at the working DIR
COPY . .

EXPOSE 3000

CMD ["nodemon", "start"]
