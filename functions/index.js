/* const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});*/
'use strict';
/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *   Author: David King
 *   Edited: Tarik Huber
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */

// 1. Deploys as dbUsersOnUpdate
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
//const admin = require('firebase-admin')

const hotmailEmail = functions.config().hotmail.email;
const hotmailPassword = functions.config().hotmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: hotmailEmail,
        pass: hotmailPassword,
    },
});

// Your company name to include in the emails
const APP_NAME = 'Advantage-Home';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendEmail = functions.firestore.document('users/{uid}').onCreate((snap, context) => {
    //const snapshot = event.data;
    console.log(snap);
    const user = snap.data();

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

/* const glob = require("glob");
const camelCase = require("camelcase");
const files = glob.sync('./*.f.js', { cwd: __dirname, ignore: './node_modules/**' });
for (let f = 0, fl = files.length; f < fl; f++) {
    const file = files[f];
    const functionName = camelCase(file.slice(0, -5).split('/').join('_')); // Strip off '.f.js'
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
        exports[functionName] = require(file);
    }
} */