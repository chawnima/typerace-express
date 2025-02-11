import * as singleRankRepository from "../repositories/singleRank";

export const getSingleRank = async () => {
  return await singleRankRepository.getSingleRankList();
};

export const postSingleRank = async (
  username: string,
  wpm: number,
  record_date: Date
) => {
  return await singleRankRepository.postSingleRank(username, wpm, record_date);
};
