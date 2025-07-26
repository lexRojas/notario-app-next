"use server";

import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

export async function getUserByUsername(dataform: {
  username: string;
  password: string;
}) {
  const res = await Prisma.usuario.findFirst({
    where: {
      AND: [{ login: dataform.username }, { password: dataform.password }],
    },
  });

  if (res) {
    return { susseful: true, user: res };
  } else {
    return { susseful: false, user: null };
  }
}
