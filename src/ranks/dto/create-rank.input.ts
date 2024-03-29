import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateRankInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  isDeletable: boolean;

  // read only field
  // @Field()
  // readonly isDeletable: boolean;

  @Field({ nullable: true })
  description: string;
}
