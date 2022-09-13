import { toShortFiatString, toShortCryptoString } from "~/lib/ui";
import type { Market } from "~/types/global";

export default function MarketsContent() {
  const array = [
    {
      id: "WETH",
      tokenPair: {
        token: {
          name: "ETH",
          symbol: "WETH",
          decimals: 18,
          address: "0x420000000000000000000000000000000000000a",
          icon: "/images/coin-icons/ethereum.svg",
          priceDecimals: 18,
          cToken: {
            name: "tETH",
            symbol: "tETH",
            decimals: 8,
            address: "0x08EE3541EEB3ba1d519EF4848D8B2A7d75BCE688",
          },
          priceInUsd: 1778.852107,
        },
        cToken: {
          name: "tETH",
          symbol: "tETH",
          decimals: 8,
          address: "0x08EE3541EEB3ba1d519EF4848D8B2A7d75BCE688",
        },
      },
      marketData: {
        depositApy: "517.47%",
        borrowApy: "517.47%",
        totalBorrowed: 0.004530635102922855,
        marketSize: 0.004530635102922855,
      },
      walletBalance: 0,
      supplyBalance: 0,
      supplyBalanceInUsd: 0,
      borrowBalance: 0,
      borrowBalanceInUsd: 0,
      comptrollerAddress: "0x798752C2cd661b3eA4B7A5b45041fA95AcE3fc02",
      borrowLimit: 0.8,
      totalBorrowedAmountInUsd: 0.329169,
      borrowLimitUsedOfToken: "0.00",
      borrowLimitUsed: "41.15",
      maxBorrowLiquidity: 0,
    },
    {
      id: "METIS",
      tokenPair: {
        token: {
          name: "METIS",
          symbol: "METIS",
          decimals: 18,
          address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
          icon: "/images/coin-icons/metis.svg",
          priceDecimals: 18,
          cToken: {
            name: "tMETIS",
            symbol: "tMETIS",
            decimals: 8,
            address: "0xB01f3D0F5dD254280aC64C89aFB3363d05b91658",
          },
          priceInUsd: 33.671208,
        },
        cToken: {
          name: "tMETIS",
          symbol: "tMETIS",
          decimals: 8,
          address: "0xB01f3D0F5dD254280aC64C89aFB3363d05b91658",
        },
      },
      marketData: {
        depositApy: "0.53%",
        borrowApy: "10.31%",
        totalBorrowed: 1.0576338996934944,
        marketSize: 19.660133357519708,
      },
      walletBalance: 0.000740896,
      supplyBalance: 0,
      supplyBalanceInUsd: 0,
      borrowBalance: 0,
      borrowBalanceInUsd: 0,
      comptrollerAddress: "0x798752C2cd661b3eA4B7A5b45041fA95AcE3fc02",
      borrowLimit: 0.8,
      totalBorrowedAmountInUsd: 0.329169,
      borrowLimitUsedOfToken: "0.00",
      borrowLimitUsed: "41.15",
      maxBorrowLiquidity: 18.602499457826216,
    },
    {
      id: "WBTC",
      tokenPair: {
        token: {
          name: "wBTC",
          symbol: "WBTC",
          decimals: 8,
          address: "0xa5B55ab1dAF0F8e1EFc0eB1931a957fd89B918f4",
          icon: "/images/coin-icons/bitcoin.svg",
          priceDecimals: 28,
          cToken: {
            name: "tWBTC",
            symbol: "tWBTC",
            decimals: 8,
            address: "0xA1377dbB30BFdc548eE8c9d7Fa3693E512dD6288",
          },
          priceInUsd: 22585.847891,
        },
        cToken: {
          name: "tWBTC",
          symbol: "tWBTC",
          decimals: 8,
          address: "0xA1377dbB30BFdc548eE8c9d7Fa3693E512dD6288",
        },
      },
      marketData: {
        depositApy: "1.37%",
        borrowApy: "17.04%",
        totalBorrowed: 0.00001165,
        marketSize: 0.00013512,
      },
      walletBalance: 0,
      supplyBalance: 0,
      supplyBalanceInUsd: 0,
      borrowBalance: 0,
      borrowBalanceInUsd: 0,
      comptrollerAddress: "0x798752C2cd661b3eA4B7A5b45041fA95AcE3fc02",
      borrowLimit: 0.8,
      totalBorrowedAmountInUsd: 0.329169,
      borrowLimitUsedOfToken: "0.00",
      borrowLimitUsed: "41.15",
      maxBorrowLiquidity: 0.00012347,
    },
    {
      id: "m.USDT",
      tokenPair: {
        token: {
          name: "USDT",
          symbol: "m.USDT",
          decimals: 6,
          address: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
          icon: "/images/coin-icons/usdt.svg",
          priceDecimals: 30,
          cToken: {
            name: "tUSDT",
            symbol: "tUSDT",
            decimals: 8,
            address: "0x2a0DDDb5783E5Cd27821148eDe1B4c90EA739025",
          },
          priceInUsd: 1.000017,
        },
        cToken: {
          name: "tUSDT",
          symbol: "tUSDT",
          decimals: 8,
          address: "0x2a0DDDb5783E5Cd27821148eDe1B4c90EA739025",
        },
      },
      marketData: {
        depositApy: "475.17%",
        borrowApy: "495.73%",
        totalBorrowed: 54.650413,
        marketSize: 55.750413,
      },
      walletBalance: 0.2,
      supplyBalance: 0.347632,
      supplyBalanceInUsd: 0.347637909744,
      borrowBalance: 0,
      borrowBalanceInUsd: 0,
      comptrollerAddress: "0x798752C2cd661b3eA4B7A5b45041fA95AcE3fc02",
      borrowLimit: 0.8,
      totalBorrowedAmountInUsd: 0.329169,
      borrowLimitUsedOfToken: "0.00",
      borrowLimitUsed: "41.15",
      maxBorrowLiquidity: 1.1,
    },
  ];

  return (
    <div>
      <div
        key="1"
        className="max-w-[1068px] px-[20px] mx-[auto] flex flex-col gap-[22px] mb-[71px] md:mb-[40px] md:gap-[20px] mt-[32px] md:mt-[31px] md:grid grid-cols-2"
      >
        <div key="1" className="panel-custom border-custom">
          <div
            key="1"
            className="px-[15px] textSize22 py-[19px] md:py-[17px] border-b border-[#282C2B] md:py-[20px] font-space font-bold text-lg leading-[23px] md:leading-7 md:px-[30px] md:pt-[19px] md:pb-[19px] md:text-xl"
          >
            Total Supply
          </div>
          <div
            key="2"
            className="font-space py-[20px] px-[15px] border-b border-[#282C2B] md:py-[24px] md:px-[30px]"
          >
            <div
              key="1"
              className="flex items-end gap-x-[10px] mb-[25px] md:mb-[30px] font-normal"
            >
              <div
                key="1"
                className="text-lg md:text-[24px] leading-[18px] md:leading-6"
              >
                <span>$</span>
                <span>1234.231234</span>
              </div>
              <div
                key="2"
                className="text-[14]  relative bottom-[1px] md:text-lg leading-[14px] md:leading-[18px] text-[#14f195]"
              >
                <span>+</span>
                <span>0.14</span>
                <span>%</span>
              </div>
            </div>
            <div
              key="2"
              className="font-nova text-xs md:text-sm leading-[17px] md:leading-5 text-[#818987] mb-[15px] md:mb-[15px]"
            >
              Top 3 Markets
            </div>
            <div
              key="3"
              className="font-nova flex flex-col font-space gap-y-[15px] md:gap-y-[24px]"
            >
              <div key="1" className="flex flex-col gap-y-[10px]">
                <label className="flex justify-between text-sm md:text-base leading-5 md:leading-[22px]">
                  <p className="uppercase">usdC</p>
                  <div key="1" className="text-[#14F195]">
                    <span>24.27</span>
                    <span>%</span>
                  </div>
                </label>
                <div
                  key="1"
                  className="border-custom px-3 relative top__custom"
                >
                  <div
                    key="1"
                    className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                    style={{
                      background: "#14F195",
                      width: "55%",
                      transition: "width 1s ease-out",
                    }}
                  ></div>
                  <div key="2" className="w-full flex absolute bottom-0 left-0">
                    <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                  </div>
                </div>
              </div>
              <div key="2" className="flex flex-col gap-y-[10px]">
                <label className="flex justify-between text-sm md:text-base leading-5 md:leading-[22px]">
                  <p className="uppercase">ETH</p>
                  <div key="1" className="text-[#14F195]">
                    <span>24.27</span>
                    <span>%</span>
                  </div>
                </label>
                <div
                  key="1"
                  className="border-custom px-3 relative top__custom"
                >
                  <div
                    key="1"
                    className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                    style={{
                      background: "#14F195",
                      width: "55%",
                      transition: "width 1s ease-out",
                    }}
                  ></div>
                  <div key="2" className="w-full flex absolute bottom-0 left-0">
                    <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                  </div>
                </div>
              </div>
              <div key="3" className="flex flex-col gap-y-[10px]">
                <label className="flex justify-between text-sm md:text-base leading-5 md:leading-[22px]">
                  <p className="uppercase">WBTC</p>
                  <div key="1" className="text-[#14F195]">
                    <span>24.27</span>
                    <span>%</span>
                  </div>
                </label>
                <div
                  key="1"
                  className="border-custom px-3 relative top__custom"
                >
                  <div
                    key="1"
                    className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                    style={{
                      background: "#14F195",
                      width: "55%",
                      transition: "width 1s ease-out",
                    }}
                  ></div>
                  <div key="2" className="w-full flex absolute bottom-0 left-0">
                    <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            key="3"
            className="flex flex-col pt-[19px] pb-[25px] px-[15px] md:py-[23px] md:px-[30px]"
          >
            <div
              key="1"
              className="flex justify-between items-center mb-[11px] md:mb-[15px] font-nova text-xs leading-[17px] md:text-sm md:leading-5 font-semibold text-[#818987]"
            >
              <p>24H Supply Volume</p>
              <p># of Suppliers</p>
            </div>
            <div
              key="2"
              className="flex justify-between items-center font-space font-normal text-base leading-4 md:text-[20px] md:leading-5"
            >
              <div key="1">
                <span>$</span>
                <span>363.32242759</span>
              </div>
              <div key="2">
                <span>300803</span>
              </div>
            </div>
          </div>
        </div>
        <div key="2" className="panel-custom border-custom">
          <div
            key="1"
            className="px-[15px] textSize22 py-[19px] md:py-[17px] border-b border-[#282C2B] md:py-[20px] font-space font-bold text-lg leading-[23px] md:leading-7 md:px-[30px] md:pt-[19px] md:pb-[19px] md:text-xl"
          >
            Total Borrow
          </div>
          <div
            key="2"
            className="font-space py-[20px] px-[15px] border-b border-[#282C2B] md:py-[24px] md:px-[30px]"
          >
            <div
              key="1"
              className="flex items-end gap-x-[10px] mb-[25px] md:mb-[30px] font-normal"
            >
              <div
                key="1"
                className="text-lg md:text-[24px] leading-[18px] md:leading-6"
              >
                <span>$</span>
                <span>465.30342</span>
              </div>
              <div
                key="2"
                className="text-[14] relative bottom-[0] sm:bottom-[1px] md:text-lg leading-[14px] md:leading-[18px] text-[#CF0C0C]"
              >
                <span>-</span>
                <span>0.14</span>
                <span>%</span>
              </div>
            </div>
            <div
              key="2"
              className="font-nova text-xs md:text-sm leading-[17px] md:leading-5 text-[#818987] mb-[15px] md:mb-[15px]"
            >
              Top 3 Markets
            </div>
            <div
              key="3"
              className="font-nova flex flex-col font-space gap-y-[15px] md:gap-y-[24px]"
            >
              <div key="1" className="flex flex-col gap-y-[10px]">
                <label className="flex justify-between text-sm md:text-base leading-5 md:leading-[22px]">
                  <p className="uppercase">usdC</p>
                  <div key="1" className="text-[#00E0FF]">
                    <span>24.27</span>
                    <span>%</span>
                  </div>
                </label>
                <div
                  key="1"
                  className="border-custom px-3 relative top__custom"
                >
                  <div
                    key="1"
                    className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                    style={{
                      background: "#00E0FF",
                      width: "68%",
                      transition: "width 1s ease-out",
                    }}
                  ></div>
                  <div key="2" className="w-full flex absolute bottom-0 left-0">
                    <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                  </div>
                </div>
              </div>
              <div key="2" className="flex flex-col gap-y-[10px]">
                <label className="flex justify-between text-sm md:text-base leading-5 md:leading-[22px]">
                  <p className="uppercase">ETH</p>
                  <div key="1" className="text-[#00E0FF]">
                    <span>24.27</span>
                    <span>%</span>
                  </div>
                </label>
                <div
                  key="1"
                  className="border-custom px-3 relative top__custom"
                >
                  <div
                    key="1"
                    className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                    style={{
                      background: "#00E0FF",
                      width: "68%",
                      transition: "width 1s ease-out",
                    }}
                  ></div>
                  <div key="2" className="w-full flex absolute bottom-0 left-0">
                    <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                  </div>
                </div>
              </div>
              <div key="3" className="flex flex-col gap-y-[10px]">
                <label className="flex justify-between text-sm md:text-base leading-5 md:leading-[22px]">
                  <p className="uppercase">WBTC</p>
                  <div key="1" className="text-[#00E0FF]">
                    <span>24.27</span>
                    <span>%</span>
                  </div>
                </label>
                <div
                  key="1"
                  className="border-custom px-3 relative top__custom"
                >
                  <div
                    key="1"
                    className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                    style={{
                      background: "#00E0FF",
                      width: "68%",
                      transition: "width 1s ease-out",
                    }}
                  ></div>
                  <div key="2" className="w-full flex absolute bottom-0 left-0">
                    <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            key="3"
            className="flex flex-col pt-[19px] pb-[25px] px-[15px] md:py-[23px] md:px-[30px]"
          >
            <div
              key="1"
              className="flex justify-between items-center mb-[11px] md:mb-[15px] font-nova text-xs leading-[17px] md:text-sm md:leading-5 font-semibold text-[#818987]"
            >
              <p>24H Borrow Volume</p>
              <p># of Borrowers</p>
            </div>
            <div
              key="2"
              className="flex justify-between items-center font-space font-normal text-base leading-4 md:text-[20px] md:leading-5"
            >
              <div key="1">
                <span>$</span>
                <span>363.32242759</span>
              </div>
              <div key="2">
                <span>300803</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        key="2"
        className="max-w-[1068px] px-[20px] mx-[auto] mb-[60px] md:mb-[100px]"
      >
        <div>
          <div className="mb-[20px] font-nova text-white text-base leading-[22px] md:leading-[25px] font-semibold mb-[21px] md:mb-[18px] md:text-lg">
            All Markets
          </div>
          <div className="pb-[5px] md:pb-[0px] panel-custom markets border-custom">
            <table className="custom__scroll w-full h-full table-fixed !pb-[20px] md:pb-[0px]  md:pt-[0px]">
              <thead>
                <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B] ">
                  <th className="pl-[15px] pb-[14px] md:pb-[19px] pt-[15px] md:pt-[19px] md:pl-[30px] font-nova font-[600] pr-[48px] text-start text-xs md:text-sm">
                    Market
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal pr-[36px]  sm:pr-[2px] text-right text-xs md:text-sm">
                    Total Supply
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal pr-[36px]  sm:pr-[14px] text-right text-xs md:text-sm">
                    Supply APY
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal pr-[36px]  sm:pr-[20px] text-right text-xs md:text-sm">
                    Total Borrow
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal pr-[36px]  sm:pr-[30px] md:pl-[0px] text-right text-xs md:text-sm">
                    Borrow APY
                  </th>
                </tr>
              </thead>

              <tbody>
                {array.map((token: Market) => {
                  return (
                    <tr
                      key={token.id}
                      className="border-t border-[#282C2B] border__top__custom border_tr_custom cursor-pointer hover:bg-[#151515] border-child-hover"
                      onClick={() => {
                        window.location.href = `/markets/${token.tokenPair.token.symbol}`;
                      }}
                    >
                      <td className="relative text-white font-nova font-normal sm:t-[0] pl-[15px] pt-[8px] pb-[26px] sm:pt-[24px] sm:pb-[23px] sm:pl-[30px] sm:pr-[0px]">
                        <div className="flex items-start md:items-center justify-left relative top-[8px] sm:top-[-1px]">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] sm:mr-[16px] sm:w-[40px] sm:h-[40px]"
                            src={token.tokenPair.token.icon}
                            alt={token.tokenPair.token.symbol}
                          />
                          <div>
                            <span className="flex text-sm md:text-base">
                              {token.tokenPair.token.symbol}
                            </span>
                            <span className="text-xs leading-[17px] md:text-sm md:leading-5 text-[#818987]">
                              USDC
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap text-right md:whitespace-normal relative text-white font-nova font-normal pb-[26px] pl-[44px] pr-[41.5px] sm:pr-[2px]">
                        <div className="custom__hidden text-sm leading-5 sm:top-[0]">
                          {token.marketData?.totalBorrowed &&
                            toShortCryptoString(
                              parseFloat(
                                token.marketData.totalBorrowed.toFixed(6)
                              )
                            )}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-[dark-green] text-[dark-green] rounded-md text-[11px] sm:text-xs h-[20px] sm:h-[22px] px-[5px] absolute top-[42px] sm:top-[50px] right-[36px] sm:right-[2px] w-fit">
                          {`$${
                            token.marketData?.totalBorrowed &&
                            toShortFiatString(
                              token.marketData.totalBorrowed *
                                token.tokenPair.token.priceInUsd
                            )
                          } USD`}
                        </div>
                      </td>
                      <td className="relative text-white text-right font-nova font-normal pb-[26px] pl-[44px] pr-[41.5px] sm:pr-[13px]">
                        <div className="custom__hidden text-sm leading-5 sm:text-base sm:leading-[22px]">
                          {token.marketData.borrowApy}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="!flex items-center break-words text-[11px] md:text-xs text-right h-[20px] sm:h-[22px] px-[5px] absolute top-[42px] sm:top-[50px] right-[36px] sm:right-[13px] w-fit">
                            -
                          </div>
                        </div>
                      </td>
                      <td className="relative text-white text-right font-nova font-normal pb-[26px] pl-[44px] pr-[41.5px] sm:pr-[21px] sm:pl-[10px]">
                        <div className="custom__hidden text-sm leading-5 sm:text-base sm:leading-[22px]">
                          {toShortCryptoString(
                            parseFloat(token.maxBorrowLiquidity.toFixed(2))
                          )}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center  break-words bg-[#3A1313] text-[#FF3939] rounded-[4px] md:rounded-md text-[11px] sm:text-xs text-right h-[20px] sm:h-[22px] px-[5px] absolute top-[42px] sm:top-[50px] right-[36px] sm:right-[21px] w-fit">
                          {`$${toShortFiatString(
                            token.maxBorrowLiquidity *
                              token.tokenPair.token.priceInUsd
                          )} USD`}
                        </div>
                      </td>
                      <td className="relative text-white font-nova font-normal text-right pb-[26px] pl-[44px] pr-[41.5px] sm:pr-[30px] sm:pl-[10px]">
                        <div className="custom__hidden text-sm leading-5 sm:text-base sm:leading-[22px]">
                          {toShortCryptoString(
                            parseFloat(token.maxBorrowLiquidity.toFixed(2))
                          )}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-[4px] sm:rounded-md text-[11px] sm:text-xs text-right h-[20px] sm:h-[22px] px-[5px] absolute top-[42px] sm:top-[50px] right-[36px] sm:right-[30px] w-fit">
                          {`$${toShortFiatString(
                            token.maxBorrowLiquidity *
                              token.tokenPair.token.priceInUsd
                          )} USD`}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
