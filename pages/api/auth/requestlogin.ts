import { createHandler } from "@api/handler";
import { createPinAndSendToUser } from "@lib/user/api/service";
import { ERROR_MESSAGES } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (req.body.username) {
    if ((await createPinAndSendToUser(req.body.username)) != null)
      return res.sendSuccess({ success: true });
    else
      return res.sendError(
        400,
        ERROR_MESSAGES.BAD_REQUEST,
        "Энэ дугаар бүртгэгдээгүй байна"
      );
  }
  return res.sendError(400, ERROR_MESSAGES.BAD_REQUEST, "failed-to-get-pin");
});

export default handler;
