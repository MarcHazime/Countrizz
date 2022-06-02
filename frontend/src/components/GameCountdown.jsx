import React, { useState, useEffect } from "react";

function GameCountdown({ onFinished }) {
  let timer;

  const [gameCount, setGameCount] = useState(61);

  useEffect(() => {
    timer = setInterval(() => {
      setGameCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          onFinished();
        } else {
          setGameCount(prevCount - 1);
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className="BtnGameCountdown">{gameCount}</div>;
}

export default GameCountdown;
