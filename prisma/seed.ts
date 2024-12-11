import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function addUsers() {
  //create random data
  const users = [
    {
      email: "example1@gmail.com",
      phoneNumber: "99887766",
      password: "password",
      role: "ADMIN",
    },
    {
      email: "example2@gmail.com",
      phoneNumber: "99887799",
      password: "password",
      role: "ADMIN",
    },
    {
      email: "example3@gmail.com",
      phoneNumber: "99887788",
      password: "password",
      role: "ADMIN",
    },
  ];
  for (const user of users) {
    await addUser(
      user.email,
      user.phoneNumber,
      user.password,
      user.role as any
    );
  }
}
const addUser = async (
  email: string,
  phoneNumber: string,
  password: string,
  role: any
) =>
  prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordDigest: await bcrypt.hash(password, 10),
      role: role,
      phoneNumber,
    },
  });

addUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("prisma seed finished");
    await prisma.$disconnect();
  });
