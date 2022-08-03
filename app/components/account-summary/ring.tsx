export default function Ring({ percent }: { percent?: number }) {
  return (
    <div className="flex">
      <div
        className="w-[109px] h-[108px] md:w-[164.96px] md:h-[164.23px]"
        style={{
          transform: "rotate(270deg) scale(1.05)",
        }}
      >
        <svg viewBox="0 0 128 128">
          <circle
            style={{
              fill: "transparent",
              strokeWidth: 5,
              strokeLinecap: "round",
              transition: "stroke-dashoffset 0.2s ease",
            }}
            stroke="url('#myGradientLight')"
            cx="64"
            cy="64"
            r="60"
          ></circle>
          <linearGradient id="myGradientLight" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#14F195" />
            <stop offset="100%" stopColor="#14F1D6" />
          </linearGradient>
        </svg>
      </div>
    </div>
  );
}
