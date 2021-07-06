## glad to left a star ⭐️

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

> docker pull devxiaolan/json-grpc-server
>
> docker tag devxiaolan/json-grpc-server json-grpc-server:latest

- or build it yourself

> docker build -t json-grpc-server:latest .

- Running

> docker run -p 3001:3001 -v /your/proto/and/json_path:/app/data json-grpc-server
> 

#### 🤔 what json file looks like ?

- TODO @see `./data/test.json`

---

本软件为公益性质，永久免费使用

如果你为本软件支付过费用，请立即退款

不接受捐款
