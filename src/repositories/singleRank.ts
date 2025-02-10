import { PrismaClient } from "@prisma/client";
import JSONBigInt from "json-bigint"
const prisma = new PrismaClient();

export const getSingleRankList = async () => {
  const rankList = await prisma.rank_single.findMany({
    take: 20,
  });
  const serializedList = JSONBigInt.stringify(rankList);
  return JSONBigInt.parse(serializedList);
};
