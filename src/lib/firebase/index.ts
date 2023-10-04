import firebaseAdmin, { ServiceAccount } from "firebase-admin";
import config from "../../config/config";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    config.thirdParty.firebase.credentials as ServiceAccount
  ),
  storageBucket: config.thirdParty.firebase.storageBucket,
});

export default firebaseAdmin;
