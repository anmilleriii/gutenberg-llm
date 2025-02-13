import { Resend } from "resend";

export async function sendVerificationEmail({
  identifier,
  url,
}: {
  identifier: string;
  url: string;
}) {
  const resend = new Resend(process.env.AUTH_RESEND_KEY);
  await resend.emails.send({
    from: `Gutenberg LLM <${process.env.AUTH_RESEND_EMAIL}>`,
    to: identifier,
    subject: "Sign In",
    html: `
          <body style="background: #e5e7eb;">
            <table width="100%" border="0" cellspacing="20" cellpadding="0"
            style="background: white; max-width: 600px; margin: auto; ">
              <tr>
                <td align="center"
                  style="padding: 20px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: black;">
                  Welcome! Click the link below to sign in to Gutenberg LLM
                </td>
              </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="border-radius: 5px;" bgcolor="black"><a href="${url}"
                        target="_blank"
                        style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: white; text-decoration: none; border-radius: 5px; padding: 10px 20px; ; display: inline-block;">Sign
                        In</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                  <a href="https://gutenberg.anmiller.com">Gutenberg LLM</a>
              </td>
            </tr>
            </table>
          </body>
`,
  });
}
