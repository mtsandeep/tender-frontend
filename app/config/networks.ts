import { NetworkName, Networks } from "~/types/global";

import rinkeby from "./networks/rinkeby";
import metisStartdust from "./networks/metisStardust";
import metisMainnet from "./networks/metisMainnet";
import arbitrum from "./networks/arbitrum.ts";

const networks: Networks = {
  [NetworkName.rinkeby]: rinkeby,
  [NetworkName.metisStartdust]: metisStartdust,
  [NetworkName.metisMainnet]: metisMainnet,
  [NetworkName.arbitrum]: arbitrum,
};

export default networks;
