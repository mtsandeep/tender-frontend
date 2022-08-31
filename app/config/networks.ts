// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { NetworkName, Networks } from "~/types/global";

import rinkeby from "./networks/rinkeby";
import metisStartdust from "./networks/metisStardust";
import metisMainnet from "./networks/metisMainnet";
import arbitrum from "./networks/arbitrum";
import avalanche from "./networks/avalanche";

const networks: Networks = {
  [NetworkName.rinkeby]: rinkeby,
  [NetworkName.metisStartdust]: metisStartdust,
  [NetworkName.metisMainnet]: metisMainnet,
  [NetworkName.arbitrum]: arbitrum,
  [NetworkName.avalanche]: avalanche,
};

export default networks;
