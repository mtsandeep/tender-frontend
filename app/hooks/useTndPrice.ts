import { useState, useEffect } from "react";
import { quotePriceInUSDC } from "~/lib/tnd";

export function useTndPrice() {
  let [tndPrice, setTNDPrice] = useState<number | null>(null);
  useEffect(() => {
    quotePriceInUSDC().then(setTNDPrice);
  }, []);
  return tndPrice;
}
