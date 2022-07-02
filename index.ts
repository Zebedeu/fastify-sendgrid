import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import sendgrid, { MailService } from '@sendgrid/mail';


const sendgridPlugin: FastifyPluginCallback<MailService> = (
  fastify,
  options: any,
  done
) => {
  if (fastify.sendgrid)
    return done(new Error("fastify-mail has been defined before "));


    const {apiKey} = options;

    if (!apiKey) {
      // api key
      return null;
    } 
      sendgrid.setApiKey(apiKey);
    
    
    sendgrid.setApiKey(options.apiKey);

  fastify
    .decorate("sendgrid", sendgrid)
    .decorateRequest("sendgrid", { getter: () => fastify.sendgrid })

  done();
};

const fastifySendgrid = fp(sendgridPlugin, {
  fastify: "4.x",
  name: "fastify-sendgrid",
});

export default fastifySendgrid;

declare module "fastify" {
  interface FastifyReply {
    sendgrid: sendgrid.MailService;
  }
  interface FastifyInstance {
    sendgrid: sendgrid.MailService;
  }
}
