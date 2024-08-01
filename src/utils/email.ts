import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
})

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: 'no-reply@mail.com',
      to,
      subject,
      text
    })
    console.log('Email sent')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
