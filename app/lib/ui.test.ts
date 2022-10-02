import { assert, describe, it } from "vitest";
import { toShortCryptoString } from "./ui";

describe("lib/ui", () => {
  describe("toShortCryptoString", () => {
    it("should format number with decimals", () => {
      // number greater than 1
      assert.equal(toShortCryptoString(2.0999), "2.10");
      assert.equal(toShortCryptoString(9000), "9,000.00");
      assert.equal(toShortCryptoString(100099.8888), "100k");
      assert.equal(toShortCryptoString(100999.8888), "101k");
      assert.equal(toShortCryptoString(123456.8888), "123k");
      
      //number less than 1
      assert.equal(toShortCryptoString(1), "1.00");
      assert.equal(toShortCryptoString(0.99), "0.99");
      assert.equal(toShortCryptoString(0.9999999999), "1.00");
      assert.equal(toShortCryptoString(0.2222222222), "0.222222");
      assert.equal(toShortCryptoString(0.5555555555), "0.555556");
      assert.equal(toShortCryptoString(0.0000005), "0.00");
      assert.equal(toShortCryptoString(0.0000006), "0.000001");
      assert.equal(toShortCryptoString(0), "0.00");
    });
  });
});
