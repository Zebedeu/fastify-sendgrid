"use strict";
const Fastify = require("fastify");
const sendgridPlugin = require("./");

const build = (options) => {
  const fastify = Fastify(options);

  fastify.register(sendgridPlugin, {
    apiKey: "",
  });

  fastify.route({
    method: "GET",
    url: "/sendmail/:email",
    schema: {
      params: {
        email: { type: "string", format: "email" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            messageId: { type: "string" },
            recipient: { type: "string" },
          },
        },
      },
    },
    handler: (req, reply, next) => {
      req.log.info("sendmail route");
      const { sendgrid } = fastify;
      const recipient = req.params.email;

      const msg = {
        to: recipient,
        from: "example@gmail.com", // Use the email address or domain you verified above
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };
      //ES6
      sendgrid.send(msg).then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
      //ES8
      (async () => {
        try {
          await sendgrid.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();
    },
  });

  return fastify;
};

if (require.main === module) {
  const fastify = build({
    logger: {
      level: "info",
    },
  });
  fastify.listen({ port: 3000 }, (err) => {
    if (err) throw err;
  });
}

module.exports = build;
