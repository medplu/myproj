import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, code) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD
            }
        });

        const mailOptions = {
            from: `"MediPlus Support" <${process.env.AUTH_EMAIL}>`,
            to: email,
            subject: "Email Verification Code - MediPlus",
            html: `
                <h3>Hello,</h3>
                <p>Thank you for registering on MediPlus. Please use the following code to verify your email address:</p>
                <h2>${code}</h2>
                <p>To complete the verification process, please enter this code on the following page: <a href="${process.env.APP_URL}/verify-email">Verify Email</a></p>
                <p>If you did not request this, please ignore this email.</p>
                <br />
                <p>Best regards,</p>
                <p>The MediPlus Team</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        throw new Error("Could not send verification email. Please try again later.");
    }
};
