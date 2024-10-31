import { useEffect, useState } from 'react'
import { Break } from './comps/Break'
import { Session } from './comps/Session'
import { Timer } from './comps/Timer'
import './App.css'

export default function App(){
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minute, setMinute] = useState(sessionLength);
  const [second, setSecond] = useState(0);
  const [isSession, setIsSession] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const formatTime = time => (time < 10 ? `0${time}` : time);
  const audio = document.getElementById("beep");

  const decrement = (count, setCount) => {
    if (count > 1){
      setCount(count - 1)
    } else{
      return;
    }
  }

  const increment = (count, setCount) => {
    if (count < 60){
      setCount(count + 1)
    } else{
      return;
    }
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    if (isSession){
      setMinute(sessionLength);
      setSecond(0);
    } 
  }, [isSession, sessionLength]);
  
  useEffect(() => {
    if (!isSession){
      setMinute(breakLength);
      setSecond(0);
    }
  }, [isSession, breakLength])

  useEffect(() => {
    let timer;
    if (isRunning){
      timer = setInterval(() => {
        if (isSession){
          setMinute(sessionLength);
          setSecond(0);
        } 
        if (!isSession){
          setMinute(breakLength);
          setSecond(0);
        }
        if (minute > 0 && second === 0){
          setMinute(minute - 1);
          setSecond(59);
        }
        if (second > 0){
          setMinute(minute);
          setSecond(second - 1);
        } 
        if (second === 0 && minute === 0){
          setIsSession(!isSession);
          audio.play();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [second, minute, isSession, isRunning, sessionLength, breakLength]);

  function resetTimer(){
    setBreakLength(5);
    setSessionLength(25);
    setMinute(sessionLength);
    setSecond(0);
    setIsSession(true);
    setIsRunning(false);
    audio.pause();
    audio.currentTime = 0;
  }

  return(
    <>
      <h1 id="title">25 + 5 Clock</h1>

      <div id="break-session-container">
        <Break 
        time={breakLength}
        decrement={isRunning ? null : () => decrement(breakLength, setBreakLength)}
        increment={isRunning ? null : () => increment(breakLength, setBreakLength)} 
        />

        <Session
        time={sessionLength} 
        decrement={isRunning ? null : () => decrement(sessionLength, setSessionLength)}
        increment={isRunning ? null : () => increment(sessionLength, setSessionLength)} 
        />
      </div>

      <Timer 
      handleStartStop={handleStartStop}
      minute={formatTime(minute)}
      second={formatTime(second)}
      isSession={isSession}
      isRunning={isRunning}
      resetTimer={() => resetTimer()}
      />

      <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" id="beep"></audio>
    </>
  )
}