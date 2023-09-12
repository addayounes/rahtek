import passport from "passport";
import config from "../config/config";
import { googleAuthUser } from "../service/auth.service";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.thirdParty.google.client_id,
      clientSecret: config.thirdParty.google.client_id,
      callbackURL: config.thirdParty.google.callback_url, // Make sure this matches your OAuth client settings
    },
    googleAuthUser
  )
);
