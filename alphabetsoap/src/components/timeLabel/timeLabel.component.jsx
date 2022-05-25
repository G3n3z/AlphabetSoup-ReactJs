import "./timeLabel.css";
import { useState, useEffect } from "react";
function TimeLabel(props) {
  
  const [timeOut, setTimeout] = useState(10);
  const {time, estado, level, loseGameForTime, intervalRef} = props;

  //time.current = timeOut;
  
  
  useEffect(() => {
    if(estado === 2)
      return;
    if(level ===  1 ){
      time.current = 30;
    }else if(level === 2){
      time.current = 60;
    }else if(level === 3){
      time.current = 90;
    }
    setTimeout(time.current);
  }, [level, estado, time])

  useEffect(() => {
    if(estado !== 1) 
    {  
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeout((t) => t - 1);
      
    }, 1000);
    return () => clearInterval(intervalRef);
  }, [estado, intervalRef, level]);
  
  useEffect(() => {
    time.current = timeOut;
    if (timeOut <= 0 && estado === 1) {
      clearInterval(intervalRef.current);
      loseGameForTime();
      //chamar perdeu
    }
  }, [timeOut, loseGameForTime, intervalRef, time, estado]);
  return (
    <>
      {estado !== 0 ? 
        (<div className="timer">
            <div className="lTime">Tempo: </div>
            <div className="time" >
              {timeOut}
            </div>
         </div>)
          : 
          (<div></div>) }
      
    </>
  );
}
export default TimeLabel;
