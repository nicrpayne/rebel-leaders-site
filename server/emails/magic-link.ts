export function magicLinkEmail(url: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sign in to Rebel Leaders</title>
</head>
<body style="margin:0;padding:0;background-color:#0f1a12;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f1a12;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#162018;border:1px solid #3d2e1a;border-radius:4px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #3d2e1a;">
              <p style="margin:0;color:#b8860b;font-size:11px;letter-spacing:4px;font-family:'Courier New',monospace;">REBEL LEADERS</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 16px;color:#e8d5a3;font-size:24px;font-weight:normal;line-height:1.3;">
                Your signal is waiting.
              </h1>
              <p style="margin:0 0 32px;color:#8a9e8c;font-size:16px;line-height:1.6;">
                Click below to sign in and access your Rebel OS readings. This link expires in 15 minutes.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#b8860b;border-radius:2px;">
                    <a href="${url}" style="display:inline-block;padding:14px 32px;color:#0f1a12;font-size:12px;letter-spacing:3px;text-decoration:none;font-family:'Courier New',monospace;font-weight:bold;">
                      ACCESS THE FIELD
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:32px 0 0;color:#4a5e4c;font-size:13px;line-height:1.5;">
                If you didn't request this, ignore this email. No account has been created.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #3d2e1a;">
              <p style="margin:0;color:#4a5e4c;font-size:11px;letter-spacing:2px;font-family:'Courier New',monospace;">
                rebel-leader.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
