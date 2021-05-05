import { signInServerType } from "@type/signInServerType";
import { auth, provider } from "@config/firebase";

export const signIn = (signInServer: signInServerType) => {
  auth
    .signInWithPopup(provider)
    .then(({ user }) => {
      if (user) {
        signInServer({
          options: {
            id: user.uid,
            email: user.email as string,
            displayName: user.displayName as string,
            photoUrl: user.photoURL as string,
          },
        });
      }
    })
    .catch((err) => alert(err.message));
};

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
            photoUrl: "",
          },
        });
      }
    })
    .catch((err) => alert(err.message));
};

export const register = (
  signInServer: signInServerType,
  name: string,
  email: string,
  password: string
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      if (user) {
        user.updateProfile({ displayName: name }).then(() => {
          signInServer({
            options: {
              id: user.uid,
              email: user.email as string,
              displayName: user.displayName as string,
              photoUrl: "",
            },
          });
        });
      }
    })
    .catch((err) => alert(err.message));
};
