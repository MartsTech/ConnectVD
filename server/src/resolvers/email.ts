import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Email } from "../entities/Email";
import { MyContext, NotifyError, Users } from "../types";
import { validateRequest } from "../utils/validateRequest";
import { RequestResponse } from "./RequestResponse";

@InputType()
class EmailContent {
  @Field()
  to: string;
  @Field()
  subject: string;
  @Field()
  message: string;
}

@ObjectType()
class SendEmailResonse {
  @Field(() => Email, { nullable: true })
  email?: Email;
  @Field(() => RequestResponse, { nullable: true })
  error?: RequestResponse;
}

@ObjectType()
class PaginatedEmails {
  @Field(() => [Email])
  emails: Email[];
  @Field()
  hasMore: boolean;
}

@Resolver(Email)
export class EmailResolver {
  @Query(() => PaginatedEmails)
  async emails(
    @Ctx() { req }: MyContext,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string
  ): Promise<PaginatedEmails> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimit, req.session.userId];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const emails = await getConnection().query(
      `
          select e.*
          from email e
          where e."senderId" = $2 OR e."receiverId" = $2
          ${cursor ? `where e."createdAt" < $3` : ""} 
          order by e."createdAt" DESC
          limit $1
        `,
      replacements
    );
    return {
      emails: emails.slice(0, realLimit),
      hasMore: emails.length === realLimitPlusOne,
    };
  }

  @Subscription(() => Email, {
    topics: "EMAILS",
    filter: ({ payload, context }) => {
      return payload.receiverId === context.connection.context.req;
    },
  })
  newEmail(
    @Root() email: Email,
    // @ts-ignore
    @Ctx() context: any
  ): Email {
    return email;
  }

  @Mutation(() => SendEmailResonse)
  async sendEmail(
    @Ctx() { req }: MyContext,
    @Arg("options") options: EmailContent,
    @PubSub("EMAILS") notifyAboutNewEmail: Publisher<Email>
  ): Promise<SendEmailResonse> {
    const request = await validateRequest(req.session.userId, options.to);
    if ((request as NotifyError).message && (request as NotifyError).status) {
      const error = request as RequestResponse;
      return { error };
    }
    const { sender, receiver } = request as Users;

    const email = await Email.create({
      senderId: req.session.userId,
      receiverId: receiver.id,
      from: sender.email,
      ...options,
    }).save();

    await notifyAboutNewEmail(email);

    return { email };
  }
}
