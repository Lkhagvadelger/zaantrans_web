import * as passport from "passport";
import { createHandler } from "@api/handler";
import { ERROR_MESSAGES } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err: any, user: any) => {
    if (err || !user) {
      console.log(user);
      console.log(err);
      return res.sendError(401, ERROR_MESSAGES.UNAUTHORIZED, err.message);
    }
    req.login(user, (err) => {
      if (err) return res.sendError(401, ERROR_MESSAGES.UNAUTHORIZED);

      req.session.userId = user.id;
      return res.sendSuccess(user);
    });
  })(req, res, next);
});

export default handler;
