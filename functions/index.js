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
const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'advantage-home';
const firestore = new Firestore({
    projectId: PROJECTID,
})
//const admin = require('firebase-admin')
/* const mailgun = require('mailgun-js')({ apiKey: "39bc661a-e2dfc08b", domain: "advantagehandy.com" }) */

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
/* console.log(gmailEmail);
console.log(gmailPassword); */
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

// Your company name to include in the emails
const APP_NAME = 'Advantage-Home-Contracting';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendEmail = functions.firestore.document('requests/{id}').onCreate((snap, context) => {
    //const snapshot = event.data;
    //console.log(snap);
    const id = context.params.id;
    const user = snap.data();
    console.log(id);
    user["id"] = id;

    return sendEmail(user);
});
// [END sendWelcomeEmail]

// Sends a welcome email to the given user.
async function sendEmail(request) {

    let data = await firestore.collection("users").doc(request.userId).get().then(doc => {
        const data = doc.data();
        return data;
    })


    let name = data.name;
    let email = data.email;

    console.log(name);
    console.log(email);
    console.log(request);

    // MAIL OPTIONS FOR PRODUCTION
    const mailOptions = {
        from: `${name} <noreply@firebase.com>`,
        to: `advantagehandy@yahoo.com`,
    };

    /* const mailOptions = {
        from: `${name} <noreply@firebase.com>`,
        to: `jessejesse10@gmail.com`,
    }; */

    // The user subscribed to the newsletter.
    mailOptions.subject = `New Estimate Request from ${email}!`;
    mailOptions.html = `
        <img src="${request.imageURL}"><br>
        <p style="font-weight: bold;">Job Description: ${request.jobDesc}<br>
        Reference: ${request.refer}<br>
        Timestamp: ${request.timestamp.toDate().toString()}<br>
        Change Status/View Estimate: <a href='https://jdt2.github.io/advantage-home-contracting/?id=${request.id}'>Here</a>
        </p>
    `;
    console.log(mailOptions);
    await mailTransport.sendMail(mailOptions);
    console.log('New request sent from:', email);
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