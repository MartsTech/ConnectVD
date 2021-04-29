import { signInServerType } from "@type/signInServerType";
import { auth } from "firebaseConfig";

export const login = (
  signInServer: signInServerType,
  email: string,
  password: string
) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      if (user) {
        signInServer({
          options: {
            id: user.uid,
            email: user.email as string,
            displayName: user.displayName as string,
            photoUrl: null,
          },
        });
      }
    })
    .catch((err) => alert(err.message));
};
