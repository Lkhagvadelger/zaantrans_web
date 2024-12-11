import {
  deserializeUser,
  localStrategy,
  serializeUser,
} from "@lib/auth/api/service";
import * as passport from "passport";

passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export { passport };
