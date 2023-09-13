import passport from "passport";
import config from "../config/config";
import { googleAuthUser, facebookAuthUser } from "../service/auth.service";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.thirdParty.google.client_id,
      clientSecret: config.thirdParty.google.client_secret,
      callbackURL: config.thirdParty.google.callback_url,
    },
    googleAuthUser
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.thirdParty.facebook.client_id,
      clientSecret: config.thirdParty.facebook.client_secret,
      callbackURL: config.thirdParty.facebook.callback_url,
      profileFields: ["id", "emails", "name", "displayName", "photos"],
    },
    facebookAuthUser
  )
);
