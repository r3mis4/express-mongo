# express-mongo

Receive data via GET and store to mongodb.

# requirements

* [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/)
## install

```bash
git clone https://github.com/r3mis4/express-mongo.git
cd express-mongo
npm install
pm2 start process.yml
pm2 save
```

# TODO

- [x] Support for second game.
- [ ] Pass game type as parameter in GET request (version 2.0.0).