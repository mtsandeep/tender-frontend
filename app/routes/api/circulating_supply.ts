import { LoaderFunction, Response } from "@remix-run/node"; // or cloudflare/deno
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ARB_MAINNET,
};

const alchemy = new Alchemy(config);

export const loader: LoaderFunction = async ({ request }) => {
  // We need to create an API end point with the data of the amount of TND
  // tokens inside the vaults thats not considered in circulation and substract
  // that from the total supply

  // Use the Alchemy API
  // https://docs.alchemy.com/reference/arbitrum-api-quickstart

  // result =
  // 10 Million
  // -  Multisig Balance      (0x80b54e18e5Bb556C6503e1C6F2655749c9e41Da2)
  // -  Team Vesting Contract (0xE356aB88bA1a4f9D36928407fEAD0FbA50Eb139d)
  // -  escrow vester contract (0x2da1594d3642B85CD83b9e13d70756337F4c5C7e)
  // -  angel vesting contract
  // -  advisor vesting         (0x2da1594d3642B85CD83b9e13d70756337F4c5C7e)
  const multisigAddress = "0x80b54e18e5Bb556C6503e1C6F2655749c9e41Da2";
  const teamVestingAddress = "0xE356aB88bA1a4f9D36928407fEAD0FbA50Eb139d";
  const esTNDvesterAddress = "0x2da1594d3642B85CD83b9e13d70756337F4c5C7e";
  const advisorVestingAddress = "0x2da1594d3642B85CD83b9e13d70756337F4c5C7e";

  async function getTokenData(hash: string) {
    const tokenData = await alchemy.core.getTokensForOwner(hash);
    return parseResponse(tokenData["tokens"]);
  }

  function parseResponse(tokens: any) {
    const tndToken = tokens.find((token: any) => token.symbol === "TND");

    if (tndToken) {
      return Math.round(tndToken.balance);
    } else {
      return 0;
    }
  }

  const multisigSupply = await getTokenData(multisigAddress);
  const teamVestingSupply = await getTokenData(teamVestingAddress);
  const esTNDvestingSupply = await getTokenData(esTNDvesterAddress);
  const advisorVestingSupply = await getTokenData(advisorVestingAddress);

  const result: string = (
    10000000 -
    multisigSupply -
    teamVestingSupply -
    esTNDvestingSupply -
    advisorVestingSupply
  ).toString();

  return new Response(result, {
    status: 200,
    headers: {
      "Content-Type": "text/json",
    },
  });
};
