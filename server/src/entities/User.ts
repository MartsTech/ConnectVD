import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ nullable: true })
  socketId: string;

  @Field()
  @Column({ nullable: true })
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;
}
