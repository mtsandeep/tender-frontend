import { useTimer } from "react-timer-hook";
import { useEffect } from "react";

const getMinTwoDigits = (number: number) =>
  number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

type TimerProps = {
  expiryTimestamp: number;
  onExpire: () => void;
  onRunning: (isRunning: boolean) => void;
};

const Timer: React.FC<TimerProps> = ({
  expiryTimestamp,
  onExpire,
  onRunning,
}) => {
  const { seconds, minutes, hours, days, isRunning } = useTimer({
    expiryTimestamp: new Date(expiryTimestamp),
    onExpire,
  });

  useEffect(() => {
    onRunning && onRunning(isRunning);
  }, [isRunning, onRunning]);

  return (
    <div>
      {!!days && `${getMinTwoDigits(days)} : `}
      {!!hours && `${getMinTwoDigits(hours)} : `}
      {`${getMinTwoDigits(minutes)} : `}
      {getMinTwoDigits(seconds)}
    </div>
  );
};

export default Timer;
