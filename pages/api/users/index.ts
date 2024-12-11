import { getCurrentDate } from "@api/currentDate";
import { createHandler } from "@api/handler";
// import { subject } from "@casl/ability";
import { createUserProfileWithPhone, getUserById } from "@lib/user/api/service";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  try {
    if (!req.user) throw AppError.Unauthorized();
    if (req.user.role != UserRole.ADMIN) throw AppError.Forbidden();

    const user = await createUserProfileWithPhone(req.body.phoneNumber, req.body.firstName, req.body.lastName, req.body.role);
    res.sendSuccess({});
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
