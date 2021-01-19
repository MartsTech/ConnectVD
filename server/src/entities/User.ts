import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Friend } from "./Friend";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  displayName!: string;

  @Field()
  @Column({ nullable: true })
  photoUrl: string;

  @Field()
  @Column({ default: "available" })
  status!: string;

  @Field()
  @Column({ nullable: true })
  socketId: string;

  @Field()
  @Column({ nullable: true })
  roomId: string;

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];

  @CreateDateColumn()
  createdAt: Date;
}
