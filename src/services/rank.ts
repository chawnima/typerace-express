import * as singleRankRepository from "../repositories/singleRank";

export const getSingleRank = async () =>{
    return await singleRankRepository.getSingleRankList();
}