import { OperationContext } from "@urql/core";
import { Exact, SignInOptionsInput } from "generated/graphql";

export type signInServerType = (
  variables?:
    | Exact<{
        options: SignInOptionsInput;
      }>
    | undefined,
  context?: Partial<OperationContext> | undefined
) => Promise<any>;
