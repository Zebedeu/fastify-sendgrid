import Fastify from "fastify";
import tap from "tap";
import fastifySendgrid from "../index";

const buildApp = async (t: Tap.Test) => {
  const fastify = Fastify({ logger: { level: "error" } });

  t.teardown(() => {
    fastify.close();
  });

  return fastify;
};

tap.test("fastify-sendgrid test", async (t) => {
  t.test("register plugin", async (t) => {
    const fastify = await buildApp(t);

    try {
      await fastify.register(fastifySendgrid);

      t.ok("sendgrid" in fastify, "should not throw any error");
    } catch (error) {
      console.log(error);
      t.error(error);
    }
  });
});