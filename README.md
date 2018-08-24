# express-mongo

Receive data via GET and store to mongodb.

# requirements

* [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/)
## install

```bash
git clone https://github.com/r3mis4/express-mongo.git
cd express-mongo
```
Set `CONNECTION_STRING` in [process.yml](./process.yml) then:

```bash
npm install
pm2 start process.yml
pm2 save
```

## Docker image

Set `CONNECTION_STRING` appropriately in the following command and run it:

```bash
docker run --name homa -d --restart always -p 80:3000 -e CONNECTION_STRING=mongodb://user:pwd@server:port/db remisa/express-mongo:1.0.0
```

# TODO

- [x] Support for second game.
- [ ] Pass game type as parameter in GET request (version 2.0.0).