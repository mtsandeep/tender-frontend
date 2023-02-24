import { LoaderFunction, json } from "@remix-run/node"; // or cloudflare/deno
import { gql, request } from "graphql-request";
import config from "~/config/networks/arbitrum"
import { useLoaderData } from "@remix-run/react";
import { loadMarketData } from "~/hooks/loaders.server";

export const getLatestBlock = async function (graphUrl: string) {
  // Return the last block indexed by indexer
    const response = await request(
        graphUrl,
        gql`
        {
          _meta {
            block {
              number
            }
          }
        }
      `
    );

    return response?._meta?.block?.number ?? 0;
};

export async function fetchMarketData(addresses: string) {
  const l2BlocksPerDay = Math.round((60 * 60 * 24) / config.l2SecondsPerBlock);
  const latestblock = await getLatestBlock(config.graphUrl);

    if (latestblock === 0) {
        // could not return last block
        throw new Error("Indexer did not return latest block")
    }

    const l2PrevDayBlock = latestblock - l2BlocksPerDay;

    return request(config.graphUrl, gql`
  {
  markets(where: {id_in: ["${addresses}"]}) {
  symbol
  underlyingSymbol
  borrowRate
  cash
  reserves
  supplyRate
  id
  totalBorrows
  underlyingPriceUSD
  },
  prevMarkets:markets(block:{number: ${l2PrevDayBlock}} where: {id_in: ["${addresses}"]}) {
  borrowRate
  cash
  reserves
  supplyRate
  id
  totalBorrows
  underlyingPriceUSD
  },
  borrowVolume:borrowEvents(where:{blockNumber_gt:${l2PrevDayBlock}}) {
  underlyingSymbol
  amount
  },
  repayVolume:repayEvents(where:{blockNumber_gt:${l2PrevDayBlock}}) {
  underlyingSymbol
  amount
  },
  supplyVolume:mintEvents(where:{blockNumber_gt:${l2PrevDayBlock}}) {
  cTokenSymbol
  underlyingAmount
  },
  redeemVolume:redeemEvents(where:{blockNumber_gt:${l2PrevDayBlock}}) {
  cTokenSymbol
  underlyingAmount
  },
  accountCTokens (where: {enteredMarket: true}) {
    id
    cTokenBalance
    totalUnderlyingBorrowed
    totalUnderlyingSupplied
  }
  }
  `);

}

export const loader:LoaderFunction = async ({ params }) => {
  let addresses: string = params.addresses ?? ""
  let res = await fetchMarketData(addresses)
  return json(res, {
    headers: {
        "Cache-Control": "max-age=120, public",
    },
  });
}