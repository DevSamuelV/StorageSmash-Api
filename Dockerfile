FROM node

EXPOSE 6757
EXPOSE 6959

WORKDIR /storagesmash-api/

COPY package.json /storagesmash-api/
RUN yarn install

COPY . /storagesmash-api/