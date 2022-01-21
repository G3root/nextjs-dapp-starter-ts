import * as React from "react";
import { Connector, Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { providers } from "ethers";
// Get environment variables

// Pick chains
const chains = defaultChains;

const connectors = [
  new InjectedConnector({ chains }),
  new WalletConnectConnector({
    options: {
      qrcode: true,
    },
  }),
];

export interface IWagmiProviderProps {
  children: React.ReactNode;
}

export function WagmiProvider({ children }: IWagmiProviderProps) {
  return (
    <Provider autoConnect connectors={connectors}>
      {children}
    </Provider>
  );
}
