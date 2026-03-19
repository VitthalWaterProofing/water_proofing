export const otpEmailTemplate = (otp: number) => {
  const year = new Date().getFullYear();
  return {
    subject: `Your Admin Login OTP – Vitthal Waterproofing`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fb;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                  <td style="background-color:#1e3a8a;padding:32px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">
                      Vitthal Waterproofing Agency
                    </h1>
                    <p style="margin:6px 0 0;color:#93c5fd;font-size:13px;">Admin Portal Security Verification</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 40px 32px;">
                    <p style="margin:0 0 8px;color:#374151;font-size:15px;">Hello, Admin</p>
                    <p style="margin:0 0 28px;color:#6b7280;font-size:14px;line-height:1.6;">
                      We received a login request to the Admin Dashboard. Use the OTP below to complete your login.
                      Do not share this code with anyone.
                    </p>

                    <!-- OTP Box -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <div style="background-color:#eff6ff;border:2px dashed #3b82f6;border-radius:12px;padding:28px 20px;width:100%;box-sizing:border-box;">
                            <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Your One-Time Password</p>
                            <p style="margin:0;color:#1e3a8a;font-size:42px;font-weight:800;letter-spacing:10px;">${otp}</p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Expiry notice -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                      <tr>
                        <td style="background-color:#fef3c7;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:0 8px 8px 0;">
                          <p style="margin:0;color:#92400e;font-size:13px;">
                            ⏱ This OTP expires in <strong>10 minutes</strong>. If you did not request this, please ignore this email.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;text-align:center;">
                    <p style="margin:0;color:#9ca3af;font-size:12px;">
                      © ${year} Vitthal Waterproofing Agency · This is an automated security email.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };
};
