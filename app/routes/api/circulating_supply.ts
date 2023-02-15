import { LoaderFunction, Response } from "@remix-run/node"; // or cloudflare/deno
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ARB_MAINNET,
};

const alchemy = new Alchemy(config);

export const loader:LoaderFunction = async ({ request }) => {
    // We need to create an API end point with the data of the amount of TND
    // tokens inside the vaults thats not considered in circulation and substract
    // that from the total supply    
  
    // Use the Alchemy API
    // https://docs.alchemy.com/reference/arbitrum-api-quickstart

    // result =
    // 10 Million
    // -  Multisig Balance      (0x80b54e18e5Bb556C6503e1C6F2655749c9e41Da2)
    // -  Team Vesting Contract 
    // -  escrow vester contract (0x2da1594d3642B85CD83b9e13d70756337F4c5C7e)
    // -  angel vesting contract
    // -  advisor vesting

    return new Response("100000000", {
        status: 200,
        headers: {
            "Content-Type": "text/json",
        },
    });
};
