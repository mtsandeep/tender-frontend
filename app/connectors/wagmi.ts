import { createClient, configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { arbitrum } from "wagmi/chains";

import getEnv from "~/utils/getEnv";

const env = getEnv();

export const { chains, provider, webSocketProvider } = configureChains(
  [arbitrum],
  [
    alchemyProvider({ apiKey: env.ALCHEMY_API_KEY, priority: 0 }),
    publicProvider({ priority: 1 }),
  ]
);

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
