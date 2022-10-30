export default function Footer() {
  interface Link {
    label: string;
    url: string;
    ico: string;
  }
  let links: Link[] = [
    {
      label: "Docs",
      url: "https://docs.tender.fi",
      ico: "/images/ico/list.svg",
    },
    {
      label: "GitHub",
      url: "https://github.com/tender-finance/front-end",
      ico: "/images/ico/git.svg",
    },
    {
      label: "Support",
      ico: "/images/ico/email.svg",
      url: "mailto:support@tender.fi",
    },
    {
      label: "Telegram",
      url: "http://t.me/tenderFi",
      ico: "/images/ico/telegram.svg",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/tender_fi",
      ico: "/images/ico/twitter.svg",
    },
    {
      label: "Discord",
      url: "https://discord.com/invite/Tender-Fi",
      ico: "/images/ico/discord.svg",
    },
  ];
  return (
    <div className="c h-[120px] border-t md:border-none border-[#2B2B2B] flex-col-reverse justify-center items-center md:flex-row justify-between items-center flex max-w-[1400px] md:h-[62px]">
      <div className="mb-[30px] md:mb-0 font-normal text-base text-[#818987]">
        © {new Date().getFullYear()} Tender Finance
      </div>
      <div className=" pt-[30px] flex gap-[20px] md:flex md:py-4 justify-center items-center">
        {links.map((item) => {
          return (
            <a
              aria-label={item.label}
              href={item.url}
              key={item.label}
              target="_blank"
              rel="noreferrer"
            >
              <img
                aria-hidden={true}
                className="icons-color w-[20px] h-[20px] md:w-[20px] md:h-[20px]"
                src={item.ico}
                alt={item.label}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
