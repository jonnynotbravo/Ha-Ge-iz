/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// const { setGlobalOptions } = require("firebase-functions/v2");
// setGlobalOptions({ maxInstances: 10 });

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Firestore trigger to copy submissions to admins/users collection
exports.copySubmissionsToAdmins = functions.firestore
  .document("/Schools/{schoolId}/Submissions/{submissionId}")
  .onCreate((snapshot, context) => {
    const schoolId = context.params.schoolId;
    const submissionData = snapshot.data();

    // Get the name of the school from the submissions data
    const schoolName = submissionData.school;

    // Query the admins collection to find the user document with the matching name
    return admin
      .firestore()
      .collection("Admins")
      .where("school", "==", schoolName)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // There should be only one user document with the matching name
          const adminUserDoc = querySnapshot.docs[0];
          const adminUserId = adminUserDoc.id;

          // Use the submission ID as the document ID for the admins/users document
          return admin
            .firestore()
            .collection("Admins")
            .doc(adminUserId)
            .collection("Students")
            .doc(context.params.submissionId) // Use the same ID from the /Schools/{schoolId}/Submissions collection
            .set(submissionData)
            .then(() => {
              console.log("Submission data copied to admins/users");
              return null;
            })
            .catch((error) => {
              console.error("Error copying submission to admins/users:", error);
              return null;
            });
        } else {
          console.log("No matching admin user found for school:", schoolName);
          return null;
        }
      })
      .catch((error) => {
        console.error("Error querying admins collection:", error);
        return null;
      });
  });
