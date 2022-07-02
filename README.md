# fastify-mail

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Version](https://img.shields.io/npm/v/fastify-sendgrid.svg)](https://www.npmjs.com/package/fastify-sendgrid)


## Install
```
npm i fastify-sendgrid --save
```

## Versions

The plugin supports the following `Fastify` and `sendgrid/mail` versions. Please refer to corresponding branch in PR and issues.

version | branch | fastify | sendgrid/mail | End of support
--------|--------|---------|------------|---------------  
1.x | [maain](https://github.com/Zebedeu/fastify-sendgrid | 4.x | ^7.7.0 |   

## Usage
Add it to you project with `register` and you are done!
You can access the transporter via `fastify.sendgrid` and *send()* via `fastify.sendgrid.send()`.
```js
const fastify = require('fastify')()

fastify.register(require('fastify-sendgrid'), {
  apiKey: ""
})

fastify.get('/sendmail/:email', (req, reply, next) => {
  let { sendgrid } = fastify
  let recipient = req.params.email

 const msg = {
        to: recipient,
        from: 'example@gmail.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      //ES6
      sendgrid
        .send(msg)
        .then(() => {}, error => {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        });
      //ES8
      (async () => {
        try {
          await sendgrid.send(msg);
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

## License

Licensed under [MIT](./LICENSE).

