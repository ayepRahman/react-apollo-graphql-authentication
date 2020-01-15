import passport from 'passport';
import express from 'express';
import FacebookTokenStrategy from 'passport-facebook-token';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;

type IStrategyCallBack = (
  accessToken: string,
  refreshToken: string,
  profile: object,
  callback: () => void
) => void;

// FACEBOOK STRATEGY
const FacebookTokenStrategyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: object,
  callback: any
) =>
  callback(null, {
    accessToken,
    refreshToken,
    profile,
  });

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_SECRET,
    },
    FacebookTokenStrategyCallback
  )
);

// GOOGLE STRATEGY
const GoogleTokenStrategyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: object,
  callback: any
) =>
  callback(null, {
    accessToken,
    refreshToken,
    profile,
  });

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    GoogleTokenStrategyCallback
  )
);

// promisified authenticate functions
const authenticateFacebook = (req: express.Request, res: express.Response): any =>
  new Promise((resolve, reject) => {
    passport.authenticate('facebook-token', { session: false }, (err, data, info) => {
      if (err) reject(err);
      resolve({ data, info });
    })(req, res);
  });

const authenticateGoogle = (req: express.Request, res: express.Response): any =>
  new Promise((resolve, reject) => {
    passport.authenticate('google-token', { session: false }, (err, data, info) => {
      if (err) reject(err);
      resolve({ data, info });
    })(req, res);
  });

export { authenticateFacebook, authenticateGoogle };
