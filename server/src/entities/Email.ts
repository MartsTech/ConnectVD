import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Email extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  senderId!: string;

  @Column()
  receiverId!: string;

  @Field()
  @Column()
  senderEmail!: string;

  @Field()
  @Column()
  senderPhotoURL!: string;

  @Field()
  @Column()
  subject!: string;

  @Field()
  @Column()
  message!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
