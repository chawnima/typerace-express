import { PrismaClient } from "@prisma/client";
import JSONBigInt from "json-bigint";
const prisma = new PrismaClient();

export const getSingleRankList = async () => {
  const rankList = await prisma.rank_single.findMany({
    take: 20,
    orderBy: {
      wpm: "desc",
    },
  });
  const serialized = JSONBigInt.stringify(rankList);
  return JSONBigInt.parse(serialized);
};

export const postSingleRank = async (
  username: string,
  wpm: number,
  record_date: Date
) => {
  const data = { username, wpm, record_date };
  const result = await prisma.rank_single.create({ data });
  const serialized = JSONBigInt.stringify(result);
  return JSONBigInt.parse(serialized);
};
