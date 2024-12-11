import { createHandler } from "@api/handler";
import { getDirectionList } from "@lib/direction/api/directionService";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();
  if (req.user.role !== UserRole.ADMIN) throw AppError.Forbidden();
  res.sendSuccess(await getDirectionList(req.body));
});

export default handler;
