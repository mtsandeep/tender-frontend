import { assert, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";

import DisplayPrice from "./DisplayPrice";

describe("components/shared/DisplayPrice", () => {
  it("should render without error", () => {
    render(<DisplayPrice amount="0" tokenSymbol="USDT" />);
    screen.getByText("0 USDT");
  });

  describe("cases for value under 10", () => {
    it("should render value 0.000001", () => {
      render(<DisplayPrice amount="0.000001" tokenSymbol="USDT" />);
      screen.getByText("0.000001 USDT");
    });
    it("should render value 0.0000001", () => {
      render(<DisplayPrice amount="0.0000001" tokenSymbol="USDT" />);
      screen.getByText("0 USDT");
    });
    it("should render value 0.00000099", () => {
      render(<DisplayPrice amount="0.00000099" tokenSymbol="USDT" />);
      screen.getByText("0.000001 USDT");
    });
    it("should render value 0.1", () => {
      render(<DisplayPrice amount="0.1" tokenSymbol="USDT" />);
      screen.getByText("0.1 USDT");
    });
    it("should render value 1", () => {
      render(<DisplayPrice amount="1" tokenSymbol="USDT" />);
      screen.getByText("1 USDT");
    });
    it("should render value 1.01", () => {
      render(<DisplayPrice amount="1.01" tokenSymbol="USDT" />);
      screen.getByText("1.01 USDT");
    });
    it("should render value 1.1111111111111111", () => {
      render(<DisplayPrice amount="1.1111111111111111" tokenSymbol="USDT" />);
      screen.getByText("1.111111 USDT");
    });
    it("should render value 1.8888888888888", () => {
      render(<DisplayPrice amount="1.8888888888888" tokenSymbol="USDT" />);
      screen.getByText("1.888889 USDT");
    });
    it("should render value 1.9999999", () => {
      render(<DisplayPrice amount="1.9999999" tokenSymbol="USDT" />);
      screen.getByText("2 USDT");
    });
    it("should render value 1.999999", () => {
      render(<DisplayPrice amount="1.999999" tokenSymbol="USDT" />);
      screen.getByText("1.999999 USDT");
    });
    it("should render value 1.999999", () => {
      render(<DisplayPrice amount="1.999999" tokenSymbol="USDT" />);
      screen.getByText("1.999999 USDT");
    });
    it("should render value 9.999999", () => {
      render(<DisplayPrice amount="9.99999999" tokenSymbol="USDT" />);
      screen.getByText("10 USDT");
    });
  });

  describe("cases for value under 1000", () => {
    it("should render value 500", () => {
      render(<DisplayPrice amount="500" tokenSymbol="USDT" />);
      screen.getByText("500 USDT");
    });
    it("should render value 900.222222", () => {
      render(<DisplayPrice amount="900.222222" tokenSymbol="USDT" />);
      screen.getByText("900.2222 USDT");
    });
    it("should render value 900.1", () => {
      render(<DisplayPrice amount="900.1" tokenSymbol="USDT" />);
      screen.getByText("900.1 USDT");
    });
  });

  describe("cases for value over 1000", () => {
    it("should render value 1000", () => {
      render(<DisplayPrice amount="1000" tokenSymbol="USDT" />);
      screen.getByText("1,000 USDT");
    });
    it("should render value 1000.222222", () => {
      render(<DisplayPrice amount="1000.222222" tokenSymbol="USDT" />);
      screen.getByText("1,000.22 USDT");
    });
    it("should render value 2000.25", () => {
      render(<DisplayPrice amount="2000.25" tokenSymbol="USDT" />);
      screen.getByText("2,000.25 USDT");
    });
  });

  describe("cases for value over 100000", () => {
    it("should render value 100000", () => {
      render(<DisplayPrice amount="100000" tokenSymbol="USDT" />);
      screen.getByText("100,000 USDT");
    });
    it("should render value 1000000", () => {
      render(<DisplayPrice amount="1000000" tokenSymbol="USDT" />);
      screen.getByText("1,000,000 USDT");
    });
    it("should render value 100000 with isCompact", () => {
      render(<DisplayPrice amount="100000" tokenSymbol="USDT" isCompact />);
      screen.getByText("100,000 USDT");
    });
    it("should render value 100001 with isCompact", () => {
      render(<DisplayPrice amount="100001" tokenSymbol="USDT" isCompact />);
      screen.getByText("100K USDT");
    });
    it("should render value 111111 with isCompact", () => {
      render(<DisplayPrice amount="111111" tokenSymbol="USDT" isCompact />);
      screen.getByText("111.11K USDT");
    });
    it("should render value 128888 with isCompact", () => {
      render(<DisplayPrice amount="128888" tokenSymbol="USDT" isCompact />);
      screen.getByText("128.89K USDT");
    });
    it("should render value 128888000 with isCompact", () => {
      render(<DisplayPrice amount="128888000" tokenSymbol="USDT" isCompact />);
      screen.getByText("128.89M USDT");
    });
  });

  describe("cases for value negative", () => {
    it("should render value -0", () => {
      render(<DisplayPrice amount="-0" tokenSymbol="USDT" />);
      screen.getByText("0 USDT");
    });
    it("should render value -0.002", () => {
      render(<DisplayPrice amount="-0.002" tokenSymbol="USDT" />);
      screen.getByText("-0.002 USDT");
    });
    it("should render value -200", () => {
      render(<DisplayPrice amount="-200" tokenSymbol="USDT" />);
      screen.getByText("-200 USDT");
    });
  });

  describe("cases for value with decimals", () => {
    it("should render value 1000000000000000000 with 16 decimals", () => {
      render(<DisplayPrice amount="1000000000000000000" decimals={16} tokenSymbol="USDT" />);
      screen.getByText("100 USDT");
    });
    it("should render value 1e18 with 16 decimals and e notation", () => {
      render(<DisplayPrice amount="1e18" decimals={16} tokenSymbol="USDT" />);
      screen.getByText("100 USDT");
    });
    it("should render value 200 with 8 decimals", () => {
      render(<DisplayPrice amount="200" decimals={8} tokenSymbol="USDT" />);
      screen.getByText("0.000002 USDT");
    });
    it("should render value 1 with 8 decimals", () => {
      // because of max 6 decimals it will be 0
      render(<DisplayPrice amount="1" decimals={8} tokenSymbol="USDT" />);
      screen.getByText("0 USDT");
    });
  });

  describe("other cases for value", () => {
    it("should render value 100005440000000000000 with 16 decimals and 2 maxDecimals", () => {
      render(<DisplayPrice amount="100005440000000000000" decimals={16} maxDecimals={2} tokenSymbol="USDT" />);
      screen.getByText("10,000.54 USDT");
    });
    it("should render value 100005440000000000000 with 16 decimals and 3 maxDecimals", () => {
      render(<DisplayPrice amount="100005440000000000000" decimals={16} maxDecimals={3} tokenSymbol="USDT" />);
      screen.getByText("10,000.544 USDT");
    });
    it("should render value dollar value $1", () => {
      render(<DisplayPrice amount="1" baseFactor="1" />);
      screen.getByText("$1.00 USD");
    });
    it("should render value dollar value $100", () => {
      render(<DisplayPrice amount="100" baseFactor="1" />);
      screen.getByText("$100.00 USD");
    });
    it("should render value dollar value $100.5555555", () => {
      render(<DisplayPrice amount="100.5555555" baseFactor="1" />);
      screen.getByText("$100.56 USD");
    });
    it("should render value dollar value 100000000 with decimal and baseFactor", () => {
      render(<DisplayPrice amount="100000000" decimals={6} baseFactor="2" />);
      screen.getByText("$200.00 USD");
    });
    it("should render value dollar value 100000000 with decimal and baseFactor", () => {
      render(<DisplayPrice amount="100000000" decimals={6} baseFactor="2" hideBaseCurrencyCode />);
      screen.getByText("$200.00");
    });
    it("should render value dollar value 123123123154121.3123123123123132 with disableFormatting", () => {
      render(<DisplayPrice amount="123123123154121.3123123123123132" maxDecimals={16} disableFormatting/>);
      screen.getByText("123123123154121.3123123123123132");
    });

    //TODO: this is not working in test, may be happy-dom doesn't support. tried polyfill but still same, check this again later
    // it("should render value dollar value 123123123154121.3123123123123132 with maxDecimals", () => {
    //   render(<DisplayPrice amount="123123123154121.3123123123123132" maxDecimals={16} />);
    //   screen.getByText("123,123,123,154,121.3123123123123132");
    // });
  });
});

// Values less than 10, max 6 decimals are shown, no minimum decimals
// tokenDecimals = 8
// 0.99999900  -> 0.999999
// 0.99999999  -> 1.00
// 0.00009999  -> 0.0001
// 0           -> 0.00
// 0.00000011  -> 0.00

// values less than 10, max 6 decimals shown, no minimum decimals
// values less than 1000, max 4 decimals shown, no minimum decimals

// values less greater than 1000, max 2 decimals shown, no minimum decimals
// comma formating for numbers greater than 1000
// million, billion in places where space is constrained

// dollar values will have max 2 decimals and min 2 decimals always
