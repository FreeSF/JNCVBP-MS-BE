import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { RanksService } from "./ranks.service";
import { Rank, RankModel } from "./entities/rank.entity";

import { CreateRankInput } from "./dto/create-rank.input";
import { UpdateRankInput } from "./dto/update-rank.input";

/**
 * RanksResolver is a Nest resolver that handles GraphQL queries and mutations related to Ranks.
 *
 * It provides endpoints for creating, retrieving, updating and deleting Ranks.
 *
 * @see RanksService
 */
@Resolver(() => Rank)
export class RanksResolver {
  constructor(private rankService: RanksService) {}

  @Mutation(() => Rank)
  createRank(@Args("createRankInput") createRankInput: CreateRankInput): Promise<RankModel> {
    return this.rankService.create(createRankInput);
  }

  @Query(() => [Rank], { name: "ranks" })
  findAll() {
    return this.rankService.findAll();
  }

  @Query(() => [Rank])
  ranksDisabled() {
    return this.rankService.findAll(true);
  }

  @Query(() => Rank, { name: "rank" })
  findOne(@Args("id") id: string) {
    return this.rankService.findOne(id);
  }

  @Mutation(() => Rank)
  updateRank(@Args("updateRankInput") updateRankInput: UpdateRankInput) {
    return this.rankService.update(updateRankInput.id, updateRankInput);
  }

  @Mutation(() => Rank)
  removeRank(@Args("id") id: string) {
    return this.rankService.remove(id);
  }

  @Mutation(() => Rank)
  restoreRank(@Args("id") id: string) {
    return this.rankService.restore(id);
  }
}
