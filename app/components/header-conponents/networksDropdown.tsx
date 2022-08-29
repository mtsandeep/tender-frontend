import { useState, useRef, useEffect } from "react";

const dummyNetworks = [
  {
    networkName: "Arbitrum",
    iconsSrc: "/images/ico/arbitrum-network.svg",
    links: [
      { linkName: "Atbitrum Bridge", url: "/" },
      { linkName: "Arbiscan", url: "/" },
      { linkName: "Helpcenter", url: "/" },
    ],
  },
  {
    networkName: "Avalanche",
    iconsSrc: "/images/ico/avalanche-network.svg",
    links: [
      { linkName: "Avalanche Bridge", url: "/" },
      { linkName: "Avalanche", url: "/" },
      { linkName: "Helpcenter", url: "/" },
    ],
  },
];

const NetworksDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConnected] = useState<boolean>(true);
  const dropdownRef = useRef<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState({
    networkName: "Arbitrum",
    iconsSrc: "/images/ico/arbitrum-network.svg",
  });

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", closeDropdown);
  }, []);

  return (
    <div
      className="relative z-10 w-[34px] h-[34px] md:w-auto md:h-[44px] m-auto mr-[6px] md:mr-[12px]"
      ref={dropdownRef}
    >
      <span
        className={`${
          isConnected ? "bg-[#01C275]" : "bg-[#FF3939]"
        } block absolute top-[-4px] right-[-4px] rounded-full border-black border-2 w-[10px] h-[10px] md:w-[12px] md:h-[12px]`}
      ></span>
      <div
        className={`group ${
          isConnected ? "bg-[#181D1B] hover:bg-[#262C2A]" : "bg-[#3A1313]"
        } flex gap-[9px] h-full items-center px-[9px] py-[9px] md:px-[12px] md:py-[12px] rounded-[6px] cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isConnected ? (
          <>
            <img className={`block`} src={selectedNetwork.iconsSrc} alt="..." />
            <div className="hidden font-nova font-semibold text-sm md:block">
              {selectedNetwork.networkName}
            </div>
          </>
        ) : (
          <>
            <img
              className={`block`}
              src="/images/ico/error-network.svg"
              alt="..."
            />
            <div className="hidden font-nova font-semibold text-sm md:block">
              Wrong Network
            </div>
          </>
        )}
        <svg
          className={`hidden md:block fill-white  justify-self-end arrow__custom ${
            isOpen ? "rotate-0" : "rotate-180"
          } ${
            isConnected
              ? "group-hover:fill-[#01C275]"
              : "group-hover:fill-[#FF3939]"
          }`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.00003 0.149816C5.17925 0.149816 5.35845 0.218246 5.49508 0.354819L9.79486 4.65464C10.0684 4.92816 10.0684 5.37163 9.79486 5.64504C9.52145 5.91845 9.07807 5.91845 8.80452 5.64504L5.00003 1.84032L1.19551 5.64491C0.921987 5.91832 0.478651 5.91832 0.205262 5.64491C-0.0683924 5.37149 -0.0683923 4.92803 0.205262 4.6545L4.50497 0.354686C4.64168 0.218091 4.82087 0.149816 5.00003 0.149816Z" />
        </svg>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } bg-[#181D1B] w-[200px] absolute top-[calc(100%+5px)] right-[0] md:top-[calc(100%+8px)] rounded-[6px]`}
      >
        <div className=" font-nova text-sm font-normal text-[#818987] pt-[14px] pl-[14px] pb-[14px] border-b-[1px] border-[#282C2B]">
          Select Network
        </div>
        <div className="bg-[#181D1B]">
          {dummyNetworks.map((network, index) => {
            return (
              <div key={network.networkName}>
                <div
                  onClick={() => {
                    setSelectedNetwork(network);
                    setIsOpen(false);
                  }}
                  className={`${
                    network.networkName === selectedNetwork.networkName &&
                    "bg-[#2B302F]"
                  } relative flex items-center w-full pl-[15px] pt-[14px] pb-[14px] cursor-pointer hover:bg-[#2B302F]`}
                >
                  <img
                    className="max-w-[16px] mr-[10px]"
                    src={network.iconsSrc}
                    alt="..."
                  />
                  <p>{network.networkName}</p>
                  {network.networkName === selectedNetwork.networkName && (
                    <span
                      className={`${
                        isConnected ? "bg-[#01C275]" : "bg-[#FF3939]"
                      } absolute block top-[40%] right-[18px] rounded-full w-[6px] h-[6px] md:w-[8px] md:h-[8px]`}
                    ></span>
                  )}
                </div>
                {network.networkName === selectedNetwork.networkName && (
                  <div
                    className={`w-full ${
                      index === dummyNetworks.length - 1
                        ? "rounded-b-[6px]"
                        : ""
                    } bg-[#2B302F]`}
                  >
                    {network.links.map((link) => (
                      <a
                        key={link.linkName}
                        className="flex group items-center justify-between pl-[14px] pr-[14px] pt-[6px] pb-[6px] text-[#818987] hover:text-[#14F195] font-nova text-sm font-medium"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.linkName}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            className="fill-[#818987] group-hover:fill-[#14F195]"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.41602 0.166992H2.49935C1.21077 0.166992 0.166016 1.21174 0.166016 2.50033V9.50033C0.166016 10.7889 1.21077 11.8337 2.49935 11.8337H9.49935C10.7879 11.8337 11.8327 10.7889 11.8327 9.50033C11.8327 8.17558 11.8327 6.58366 11.8327 6.58366C11.8327 6.26166 11.5713 6.00033 11.2493 6.00033C10.9273 6.00033 10.666 6.26166 10.666 6.58366V9.50033C10.666 10.1443 10.1433 10.667 9.49935 10.667C7.55685 10.667 4.44127 10.667 2.49935 10.667C1.85477 10.667 1.33268 10.1443 1.33268 9.50033C1.33268 7.55783 1.33268 4.44224 1.33268 2.50033C1.33268 1.85574 1.85477 1.33366 2.49935 1.33366H5.41602C5.73802 1.33366 5.99935 1.07233 5.99935 0.750326C5.99935 0.428326 5.73802 0.166992 5.41602 0.166992ZM9.84118 1.33366H7.74935C7.42735 1.33366 7.16602 1.07233 7.16602 0.750326C7.16602 0.428326 7.42735 0.166992 7.74935 0.166992H11.2493C11.5713 0.166992 11.8327 0.428326 11.8327 0.750326V4.25033C11.8327 4.57233 11.5713 4.83366 11.2493 4.83366C10.9273 4.83366 10.666 4.57233 10.666 4.25033V2.15849L6.41177 6.41274C6.18427 6.64024 5.81443 6.64024 5.58693 6.41274C5.35885 6.18524 5.35885 5.81541 5.58693 5.58791L9.84118 1.33366Z"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NetworksDropdown;
