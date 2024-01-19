const resetPasswordTemplate = ({
  resetToken
}) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Reset</title>
    </head>
    <body>
      <h1>Password Reset</h1>
      <p>Hello,</p>
      <p>You are receiving this email because a request has been made to reset the password for your account.</p>
      <p>Please click the link below to reset your password:</p>
      <p><a href=exp://192.168.0.51:19000/auth/reset-password?token=${resetToken}>Reset Password</a></p>
      <p>If you did not make this request, please ignore this email and your password will remain unchanged.</p>
      <p>Thank you,</p>
      <p>${resetToken}<p/>
    </body>
  </html>
  `;
};
export  {
  resetPasswordTemplate
};