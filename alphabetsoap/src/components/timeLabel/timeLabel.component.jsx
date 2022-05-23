import "./timeLabel.css";
import { useState, useEffect, useRef } from "react";
function TimeLabel(props) {
  const timerIdRef = useRef(0);
  const [timeOut, setTimeout] = useState(10);
  const [active, setActive] = useState(true);
  const {time} = props;

  time.current = timeOut;
  
  const startTimer = () => {
    console.log(time.current);
    console.log(timeOut);
    setTimeout(timeOut - 1);
    // console.log(timeOut);
    // if (timerIdRef.current) {
    //   return;
    // }

    // console.log(timeOut);
    // timerIdRef.current = setInterval(() => {
      
    //     setTimeout(timeOut - 1);
      
    // }, 1000);
  };

  useEffect(() => {
    //console.log(timeOut);
    //clearInterval(timerIdRef.current);
  }, []);

  return (
    <div className="timer">
      <div className="lTime">Tempo: </div>
      <div className="time" onClick={startTimer}>
        {timeOut}
      </div>
    </div>
  );
}
export default TimeLabel;
