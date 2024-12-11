import { getCurrentDate } from "@api/currentDate";
import { prisma } from "@api/prisma";
import { sendVerificationCodeViaCallPro } from "@api/sms/callpro";
import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
import { AppError } from "@util/errors";
import { compare, hash } from "bcryptjs";

const saltRounds = 10;

const defaultSelect = {
  id: true,
  email: true,
  emailVerified: true,
  phoneNumber: true,
  phoneNumberVerified: true,
  role: true,
  updatedAt: true,
  createdAt: true,
  profile: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      sex: true,
      dob: true,
      height: true,
      weight: true,
      picture: true,
      notifyEmail: true,
      notifyPush: true,
      notifyBadge: true,
    },
  },
};

export const getUserList = async (filter: QueryParamType) => {
  const size = Number(filter.size),
    page = Number(filter.page);

  if (size <= 0 || page <= 0)
    throw AppError.BadRequest("validation.paging.size");

  const filters: any | any[] = [];
  if (filter.role) filters.push({ role: filter.role });
  if (filter.text) {
    const fText = { contains: filter.text, mode: "insensitive" };
    filters.push({
      OR: [
        { phoneNumber: fText },
        { email: fText },
        {
          profile: {
            OR: [{ firstName: fText }, { lastName: fText }],
          },
        },
      ],
    });
  }
  const where =
    filters.length === 0
      ? {}
      : filters.length === 1
      ? filters[0]
      : { AND: filters };
  const total = await prisma.user.count({ where });

  return {
    total,
    pages: Math.ceil(total / size),
    data: await prisma.user.findMany({
      where,
      include: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
            priceMin: true,
            priceMax: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: size * (page - 1),
      take: size,
    }),
  };
};

export const getHospitalUserList = async (
  filter: QueryParamType,
  userId: string
) => {
  const size = Number(filter.size),
    page = Number(filter.page);

  if (size <= 0 || page <= 0)
    throw AppError.BadRequest("validation.paging.size");

  const filters: any | any[] = [];
  if (filter.invitedByMeOnly === "true") filters.push({ invitedBy: userId });
  else
    filters.push({
      hospitalUsers: { some: { hospitalId: filter.hospitalId } },
    });
  if (filter.role) filters.push({ role: filter.role });
  if (filter.text) {
    const fText = { contains: filter.text, mode: "insensitive" };
    filters.push({
      OR: [
        { phoneNumber: fText },
        { email: fText },
        {
          profile: {
            OR: [{ firstName: fText }, { lastName: fText }],
          },
        },
      ],
    });
  }

  const where =
    filters.length === 0
      ? {}
      : filters.length === 1
      ? filters[0]
      : { AND: filters };
  const total = await prisma.user.count({ where });

  return {
    total,
    pages: Math.ceil(total / size),
    data: await prisma.user.findMany({
      where,
      include: {
        profile: {
          select: {
            patientCode: true,
            firstName: true,
            lastName: true,
            specialistDesc: true,
            priceMin: true,
            priceMax: true,
            sex: true,
            dob: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: size * (page - 1),
      take: size,
    }),
  };
};

export const getUser = async (email: string) => {
  return prisma.user.findUnique({
    where: { email: email },
    select: defaultSelect,
  });
};

export const getUserPasswordDigest = async (phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: { phoneNumber },
    select: { ...defaultSelect, passwordDigest: true },
  });
  const passwordDigest = user?.passwordDigest;
  // @ts-expect-error
  if (user) delete user.passwordDigest;
  return { user, passwordDigest };
};

export const getUserPasswordDigestByPhone = async (phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: { phoneNumber },
    select: { ...defaultSelect, passwordDigest: true },
  });
  const passwordDigest = user?.passwordDigest;
  // @ts-expect-error
  if (user) delete user.passwordDigest;
  return { user, passwordDigest };
};

export const getUserPasswordDigestById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user?.passwordDigest;
};
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: defaultSelect,
  });
};
export const getUserByPhoneNumber = async (phoneNumber: string) => {
  return prisma.user.findUnique({
    where: { phoneNumber },
    select: defaultSelect,
  });
};
export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: defaultSelect,
  });
};

export const createUser = async (email: string, password: string) => {
  //default role = Patient, no need to mention
  const passwordDigest = await hash(password, saltRounds);
  return prisma.user.create({
    data: { email, passwordDigest, phoneNumber: "00000000" },
    select: defaultSelect,
  });
};

export const createUserWithPhone = async (
  phoneNumber: string,
  password: string,
  email?: string,
  role?: UserRole,
  inviteToken?: string,
  invitedBy?: string,
  hospitalId?: string
) => {
  //default role = Patient, no need to mention
  const passwordDigest = await hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      phoneNumber,
      email: email?.toLowerCase(),
      passwordDigest,
      phoneNumberVerified: getCurrentDate(),
      role,
    },
    select: { id: true },
  });

  return (await prisma.user.findUnique({
    where: {
      id: newUser.id,
    },
    select: defaultSelect,
  }))!;
};

export const createUserProfileWithPhone = async (
  phoneNumber: string,
  password: string,
  firstName: string,
  lastName: string,
  dob: string,
  email?: string,
  role?: UserRole,
  sex?: any,
  inviteToken?: string,
  invitedBy?: string
) => {
  //default role = Patient, no need to mention
  const passwordDigest = await hash(password, saltRounds);
  return prisma.user.create({
    data: {
      phoneNumber,
      email: email?.toLowerCase(),
      passwordDigest,
      phoneNumberVerified: getCurrentDate(),
      role,
      profile: {
        create: {
          dob,
          sex,
          firstName,
          lastName,
        },
      },
    },
    select: defaultSelect,
  });
};

export const createExternalUser = async (email: string) => {
  //default role = Patient, no need to mention
  return prisma.user.create({
    data: { email, phoneNumber: "00000000", passwordDigest: "" },
    select: defaultSelect,
  });
};

export const compareUserPassword = async (userId: string, password: string) => {
  const userPassword = (await getUserPasswordDigestById(userId)) || "";
  return compare(password, userPassword);
};

export const resetPassword = async (phoneNumber: string, password: string) => {
  const user = await getUserPasswordDigestByPhone(phoneNumber);
  return await changePassword({ userId: user.user!.id, password: password });
};

export const checkEmailNotExists = async (email: string) => {
  return (await prisma.user.count({ where: { email } })) === 0;
};

export const checkPhoneNotExists = async (phoneNumber: string) => {
  return (await prisma.user.count({ where: { phoneNumber } })) === 0;
};

export const checkPhoneNumberFailedRequest = async (
  phoneNumber: string,
  ipAddress: string,
  limit?: number
) => {
  if (!limit) limit = 5;
  const limitDate = new Date();
  limitDate.setHours(limitDate.getHours() - 0.5);
  const result = await prisma.smsRequestAttempt.count({
    where: { OR: [{ phoneNumber, ipAddress }], createdAt: { gte: limitDate } },
  });
  if (result < limit) {
    await createPhoneNumberRequestAttempt(phoneNumber, ipAddress);
    return true;
  }
  return false;
};

export const createPhoneNumberRequestAttempt = async (
  phoneNumber: string,
  ipAddress: string
) => {
  return prisma.smsRequestAttempt.create({
    data: {
      phoneNumber,
      ipAddress,
    },
  });
};
export const changePhoneNumber = async ({
  userId,
  phoneNumber,
}: {
  userId: string;
  phoneNumber: string;
}) => {
  await prisma.user.update({
    where: { id: userId },
    data: { phoneNumber },
  });
  return {};
};

export const changeEmail = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  await prisma.user.update({
    where: { id: userId },
    data: { email },
  });
  return {};
};

export const changePasswordByUsername = async (
  method: string,
  username: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: method === "phone" ? { phoneNumber: username } : { email: username },
  });
  if (!user) return;
  await changePassword({ userId: user.id, password });
  return user;
};

export const changePassword = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  const passwordDigest = await hash(password, saltRounds);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordDigest },
  });
  return {};
};
export const consumePin = async (phoneNumber: string) => {
  await prisma.user.update({
    where: { phoneNumber },
    data: {
      pin: null,
      pinCreatedAt: null,
      pinType: null,
      pinVerifiedAt: new Date(),
    },
  });
};
export const getUserByPhone = async (phoneNumber: string) => {
  return await prisma.user.findUnique({
    where: { phoneNumber },
    select: defaultSelect,
  });
};
export const createPinAndSendToUser = async (phoneNumber: string) => {
  //check is user exist with email
  const user = await getUserByPhone(phoneNumber);
  if (user) {
    const code = "123456"; // await create4DigitCode(user.id, "email");
    //change password to code
    await changePassword({ userId: user.id, password: code });
    //send email to user
    code != "123456" &&
      (await sendVerificationCodeViaCallPro(phoneNumber, code));
    return user;
  }
  return null;
};
