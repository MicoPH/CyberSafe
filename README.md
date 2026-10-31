# CyberSafe
A cybersecurity Module

## Firebase setup

- Enable Email/Password sign-in in Firebase Authentication. User accounts must be created by an administrator; the app only provides sign-in.
- Add the app's hosting domain (or `localhost` during development) to Firebase Authentication's authorized domains. Do not open the app using `file://`.
- Deploy the included Firestore rules to project `cybersafe-11a37` with the Firebase CLI:

  ```sh
  firebase deploy --only firestore:rules --project cybersafe-11a37
  ```

After signing in as the configured administrator on `index(admin).html`, use **Import all lessons** to copy the 30 bundled lessons into Firestore collection `lessons`, using each lesson ID as its document ID. Re-import after changing the lesson source to update those documents. Deploy Firestore rules before importing.

The student app reads all lessons from Firestore collection `lessons` after sign-in; it no longer loads the lesson bundle from the student page. A successful import is required before students can sign in to the app.

After sign-in, the app reads and writes the signed-in user's data at `users/{uid}`. This includes learning and quiz progress, activity, preferences, HYPE BLAST progress, and high score. Existing browser saves are imported into the first signed-in account that has no Firestore document, then removed from that browser.

The leaderboard uses a separate `leaderboard/{uid}` document containing only the student's nickname, strand, section, XP, and HYPE BLAST high score. Signed-in users can read these public leaderboard fields; each user can write only their own entry. Rankings update live while the leaderboard page is open. Scores are submitted by the browser and are not tamper-resistant; use a trusted backend before treating them as official or competitive results.

## Admin quiz uploads

- The standalone `index(admin).html` page signs in with Firebase Email/Password and uploads quiz JSON to Realtime Database at `quizzes/modules/{moduleId}`. Select an existing module ID (1–5) or Final Boss ID 6; that ID tells the student app which quiz to load and which completion record to update. The student app uses an uploaded Final Boss quiz when available and retains the bundled quiz as a fallback until one is uploaded. Each upload gets a version ID so a replacement quiz gets a separate one-time attempt.
- Quiz uploads are writable only by the configured administrator UID `CiAfx7qxaxciuavJBav2dLBHdLU2`. Signed-in students can read quiz questions and answer keys, see feedback and scores in the app, and submit one attempt at `quizAttempts/{uid}/{moduleId}/{version}`. Realtime Database rules prevent changing that attempt after it is created.
- Answer keys are exposed to signed-in clients to support in-browser feedback and scoring. Students can inspect or manipulate client-side code and scores; use a trusted backend grader on Blaze if results need to be private or authoritative.
- This protection applies to quizzes uploaded through the admin page. The existing built-in module quiz answer keys are bundled in client-side JavaScript and are not private.
- Upload JSON as a root array or an object with a `questions` array. Each question must have `q` or `question` text, an `answers` array of at least two strings, and a zero-based `correct` or `ans` answer index. The admin page normalizes it to the format used by the student quiz app.
- The administrator UID is an identifier, not a password or secret. Never put a service account, database secret, or other privileged credential in browser code. Update the allowed UID in both `index(admin).html` and `database.rules.json` if the administrator account changes.
- Deploy the Realtime Database rules with the Firebase CLI: `firebase deploy --only database --project cybersafe-11a37`. Add the page's hosting domain to Firebase Authentication's authorized domains and serve it over HTTP(S), not `file://`.
- Do not use a Realtime Database secret in the page. If a database secret or other privileged key has been shared, revoke/rotate it in Firebase/Google Cloud.
