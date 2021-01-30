import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class RequestResponse {
  @Field()
  message: string;
  @Field()
  status: string;
}
