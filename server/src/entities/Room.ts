import { Field, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Room extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt: Date;
}
