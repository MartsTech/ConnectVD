import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Friend extends BaseEntity {
  @PrimaryColumn()
  userId!: string;

  @PrimaryColumn()
  friendId!: string;

  @PrimaryColumn({ default: "pending" })
  status!: "pending" | "accepted" | "invite";

  @Field()
  @Column()
  //email
  id!: string;

  @Field()
  @ManyToOne(() => User, (user) => user.friends)
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
