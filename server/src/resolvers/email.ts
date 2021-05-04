import {
  Arg,
  Args,
  ArgsType,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Email } from "../entities/Email";
import { NotifyError, Users } from "../types";
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

@ArgsType()
class NewEmailArgs {
  @Field()
  uid: string;
}

@Resolver(Email)
export class EmailResolver {
  @Query(() => PaginatedEmails)
  async emails(
    @Arg("uid") uid: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor?: string
  ): Promise<PaginatedEmails> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimit, uid];

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
    filter: ({ payload, args }: ResolverFilterData<Email, NewEmailArgs>) => {
      return payload.receiverId === args.uid;
    },
  })
  newEmail(
    @Root() email: Email,
    // @ts-ignore
    @Args() { uid }: NewEmailArgs
  ): Email {
    return email;
  }

  @Mutation(() => SendEmailResonse)
  async sendEmail(
    @Arg("uid") uid: string,
    @Arg("options") options: EmailContent,
    @PubSub("EMAILS") notifyAboutNewEmail: Publisher<Email>
  ): Promise<SendEmailResonse> {
    const request = await validateRequest(uid, options.to);

    if ((request as NotifyError).message && (request as NotifyError).status) {
      const error = request as RequestResponse;
      return { error };
    }
    
    const { sender, receiver } = request as Users;

    const email = await Email.create({
      senderId: uid,
      receiverId: receiver.id,
      senderEmail: sender.email,
      subject: options.subject,
      message: options.message,
      senderPhotoURL: sender.photoUrl,
    }).save();

    await notifyAboutNewEmail(email);

    return { email };
  }
}
