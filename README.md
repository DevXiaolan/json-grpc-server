#### json-grpc-server

Get a full fake GRPC API with zero coding in less than 30 seconds 🤡 

#### ⭐️ Running as node app

- Install dependences

> npm install

- Put your proto and json into `./data`

> @see `./data/test.proto ` and `./data/test.json`

- Running

> npm start

#### ⭐️ Running via docker

- pull image

> docker push devxiaolan/json-grpc-server
>
> docker tag devxiaolan/json-grpc-server json-grpc-server:latest

- or build it yourself

> docker build -t json-grpc-server:latest .

- Running

> docker run -p 3001:3001 -v /your/proto/and/json_path:/app/data json-grpc-server
> 

#### 🤔 what json file looks like ?

- TODO @see `./data/test.json`