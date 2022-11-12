import { useState } from "react";
import type { JsonRpcSigner } from "@ethersproject/providers";
import type { TokenPair } from "~/types/global";
import { useGlpCooldown } from "~/hooks/use-glp-cooldown";
import Timer from "../shared/Timer";

type GlpCooldownTimerProps = {
  signer: JsonRpcSigner;
  tokenPair: TokenPair;
  onRunning: (isRunning: boolean) => void;
  onExpire: () => void;
};

const GlpCooldownTimer: React.FC<GlpCooldownTimerProps> = ({
  signer,
  tokenPair,
  onRunning,
  onExpire,
}) => {
  const [hasTimer, setHasTimer] = useState(true);

  const { isCoolingdown, cooldownTime } = useGlpCooldown(
    signer,
    tokenPair.token.glpManager!,
    tokenPair.cToken.address
  );

  const handleExpire = () => {
    setHasTimer(false);
    onExpire();
  };

  if (!isCoolingdown || !cooldownTime || !hasTimer) return null;
  return (
    <div>
      <div className="font-bold font-nova text-sm sm:text-sm w-full">
        GLP Cooldown
      </div>
      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base mb-[24px]">
        <div className="flex-grow">Withdrawal enables in</div>
        <div className="text-white text-base font-nova">
          <Timer
            expiryTimestamp={cooldownTime}
            onExpire={handleExpire}
            onRunning={onRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default GlpCooldownTimer;
