import { LoaderFunction, Response } from "@remix-run/node"; // or cloudflare/deno
import type { LoaderArgs } from "@remix-run/node";

export const loader:LoaderFunction = async ({ request }: LoaderArgs) => {
    return new Response("100000000", {
        status: 200,
        headers: {
          "Content-Type": "text/json",
        },
      });
    };
