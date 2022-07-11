import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import * as React from "react";
import { fetchSession } from "@/store/slices/userSlice";

function MyApp({ Component, pageProps }: AppProps) {
  
  // update session & set token
  React.useEffect(() => {
    store.dispatch(fetchSession());
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
