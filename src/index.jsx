import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ApplicationUpdater from './state/application/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import ToastListener from './components/ToastListener'
import ListsUpdater from './state/lists/updater'
import './i18n';
import 'inter-ui'
import "./fonts/audiowide-cufonfonts-webfont/style.css";
import "./fonts/Roboto/stylesheet.css";
import "./fonts/fontawesome/css/all.css";

import Providers from './Providers'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
        <ToastListener />
      </>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
