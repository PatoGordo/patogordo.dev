import { ZodError } from "zod";
import { appConfig } from "~/config/app";
import v from "~/config/validate";
import { sendMail } from "~/server/services/mail";

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactDto>(event);

  try {
    validation.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(
        (e) => `"${e.path.join(".")}": ${e.message}`
      );

      throw createError({
        statusCode: 422,
        message: errors?.[0],
      });
    }
  }

  try {
    await sendMail({
      to: appConfig.contactMailAddress,
      subject: body.subject,
      body: `
      <strong>Name</strong>: ${body.name}<br>
      <strong>Email</strong>: ${body.email}<br>
      <strong>Subject</strong>: ${body.subject}<br>
      <strong>Message</strong>: ${body.message}<br>
    `.trim(),
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      message:
        "Failed to send your contact! Please try again or contact-me using another method.",
    });
  }
});

const validation = v
  .object({
    name: v.string().min(1).max(256),
    email: v.string().email().min(1).max(320),
    subject: v.string().min(1).max(256),
    message: v.string().min(1).max(2048),
  })
  .strict();

type ContactDto = v.infer<typeof validation>;
