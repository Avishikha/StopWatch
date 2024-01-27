import { useEffect, useState } from "react";

export default function App() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  let interval: number;
  const updateTimer = () => {
    setSecond((prevSecond: number) => {
      if (prevSecond === 59) {
        setMinute((prevMinute: number) => prevMinute + 1);
        return 0;
      }
      return prevSecond + 1;
    });
  };

  useEffect(() => {
    if (isRunning && !isPause) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPause]);
  const formatTime = (min: number, sec: number) => {
    return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };
  const setRestart = () => {
    console.log(minute, second);
    setIsRunning(!isRunning);
    setSecond(0);
    setMinute(0);
    clearInterval(interval);
    if (isRunning) {
      alert(`Timer stopped at ${formatTime(minute, second)}`);
      //   setIsRunning(!isRunning);
    }
  };
  const handlePause = () => {
    setIsPause(!isPause);
    clearInterval(interval);
  };
  return (
    <>
      <div>
        <h1>{formatTime(minute, second)}</h1>
        <button onClick={() => setRestart()}>
          {isRunning ? "STOP" : "START"}
        </button>
        {isRunning && (
          <button onClick={() => handlePause()}>
            {!isPause ? "PAUSE" : "RESUME"}
          </button>
        )}
      </div>
    </>
  );
}
