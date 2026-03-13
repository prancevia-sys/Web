const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  return resend.emails.send({
    from: "Prancevia Private Limited <onboarding@resend.dev>",
    to: [to],
    subject,
    html,
  });
};

module.exports = sendEmail;