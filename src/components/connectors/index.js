import { InjectedConnector } from "@web3-react/injected-connector";

import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { BscConnector } from "@binance-chain/bsc-connector";

import { chainId, networkUrl } from "config";

// import { NetworkConnector } from './NetworkConnector'

// export const NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ?? '56')

export const NETWORK_CHAIN_ID = chainId;

const NETWORK_URL = networkUrl;

// const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97],
});

// export const network = new NetworkConnector({
//   urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
// })
