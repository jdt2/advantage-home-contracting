// 1. Deploys as dbUsersOnUpdate
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
//const admin = require('firebase-admin')

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

// Your company name to include in the emails
const APP_NAME = 'Advantage-Home';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendEmail = functions.firestore.document('users/{uid}').onCreate((event) => {
    const snapshot = event.data
    const user = snapshot.val();

    return sendEmail(user.email);
});
// [END sendWelcomeEmail]

// Sends a welcome email to the given user.
async function sendEmail(email) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: `jessejesse10@gmail.com`,
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey Jesse! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
    await mailTransport.sendMail(mailOptions);
    console.log('New welcome email sent to:', email);
    return null;
}