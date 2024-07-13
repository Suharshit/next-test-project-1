import User from "@/modals/userModal";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"

export const sendEmail = async({
    email,
    emailType,
    userId
}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if(emailType === "VERIFY"){
          await User.findById(userId, {
            verifyToken: hashedToken,
            verifyExpires: Date.now() + 3600000
          })
        } else if (emailType === "RESET"){
          await User.findById(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordExpires: Date.now() + 3600000
          })
        }
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "9bbf1e4411eb6a",
            pass: "f6c24e033baca8"
          }
        });

        const mailOptions = {
          from: "suharshit123@gmial.com",
          to: email,
          subject: emailType === "VERIFY" ? "Verify  your email" : "Reset your password",
          text: "Please click on the following link to verify your email",
          html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${ emailType === "VERIFY" ? "verify your email" : "reset your password" } or copy paste link in your browser <br>  ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}