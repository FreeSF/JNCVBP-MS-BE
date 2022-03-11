import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { VolunteersService } from "./volunteers.service";
import { Volunteer, VolunteerModel } from "./entities/volunteer.entity";
import { CreateVolunteerInput } from "./dto/create-volunteer.input";
import { UpdateVolunteerInput } from "./dto/update-volunteer.input";
import { Rank, RankModel } from "src/ranks/entities/rank.entity";
import { RanksService } from "src/ranks/ranks.service";

@Resolver(() => Volunteer)
export class VolunteersResolver {
  constructor(private readonly volunteersService: VolunteersService, private rankService: RanksService) {}

  @Mutation(() => Volunteer)
  createVolunteer(@Args("createVolunteerInput") createVolunteerInput: CreateVolunteerInput) {
    return this.volunteersService.create(createVolunteerInput);
  }

  @Query(() => [Volunteer], { name: "volunteers" })
  findAll() {
    return this.volunteersService.findAll();
  }

  @Query(() => Volunteer, { name: "volunteer" })
  findOne(@Args("id") id: string) {
    return this.volunteersService.findOne(id);
  }

  @Mutation(() => Volunteer, { name: "updateVolunteer" })
  updateVolunteer(@Args("updateVolunteerInput") updateVolunteerInput: UpdateVolunteerInput) {
    console.log(updateVolunteerInput);
    return this.volunteersService.update(updateVolunteerInput.id, updateVolunteerInput);
  }

  @Mutation(() => Volunteer)
  removeVolunteer(@Args("id") id: string) {
    return this.volunteersService.remove(id);
  }

  @ResolveField(() => Rank)
  rank(@Parent() volunteer: VolunteerModel): Promise<RankModel | null> {
    return this.rankService.findOne(volunteer.rank?._id);
  }
}
