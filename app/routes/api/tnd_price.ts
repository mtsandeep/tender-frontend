import { LoaderFunction, json } from "@remix-run/node"; // or cloudflare/deno
import { Tendies } from "~/config/networks/arbitrum";

let contract = Tendies.Tokens.TND.address

export const loader:LoaderFunction = async ({ request }) => {
    let response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/arbitrum-one?contract_addresses=${contract}&vs_currencies=usd`)
    let data = await response.json() as {[contract: string]: {"usd": number}}
    
    return json(data[contract], {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": `public, max-age=60, stale-if-error=300`,
        },
    });
};
