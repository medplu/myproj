import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
    try {
        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
            auth: {
                user: process.env.AUTH_EMAIL,  // Your email address
                pass: process.env.AUTH_PASSWORD // Your email password or app-specific password
            }
        });

        // Construct the verification link
        const verificationLink = `${process.env.APP_URL}/verify-email?token=${token}`;

        // Setup email data
        const mailOptions = {
            from: `"MediPlus Support" <${process.env.AUTH_EMAIL}>`, // Sender address
            to: email, // List of recipients
            subject: "Email Verification - MediPlus", // Subject line
            html: `
                <h3>Hello,</h3>
                <p>Thank you for registering on MediPlus. Please click the link below to verify your email address:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>If you did not request this, please ignore this email.</p>
                <br />
                <p>Best regards,</p>
                <p>The MediPlus Team</p>
            ` // HTML body content
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        throw new Error("Could not send verification email. Please try again later.");
    }
};
