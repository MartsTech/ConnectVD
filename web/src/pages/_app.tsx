import "@style/globals.css";
import { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
};

export default MyApp;
