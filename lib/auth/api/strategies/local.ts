import {
  changePassword,
  consumePin,
  getUserPasswordDigest,
} from "@lib/user/api/service";
import { compare } from "bcryptjs";
import { Strategy } from "passport-local";

export const localStrategy = new Strategy(
  { usernameField: "username", passwordField: "pin" },
  async (phoneOrEmail, password, callback) => {
    console.log(phoneOrEmail, password);
    const { user, passwordDigest } = await getUserPasswordDigest(phoneOrEmail);
    const finalUser =
      passwordDigest && (await compare(password, passwordDigest)) ? user : null;
    if (!finalUser) {
      return callback({ message: "invalid-credentials" }, false);
    }
    const randomString = Math.random().toString(36).substring(7);

    await changePassword({ userId: finalUser.id, password: randomString });
    await consumePin(finalUser.phoneNumber);
    return callback(null, finalUser);
  }
);
