export function Timer({ minute, second, isSession, isRunning, handleStartStop, resetTimer }){
    return (
        <div id="timer">
            <p id="timer-label">{isSession ? "Session" : "Break"}</p>
            <p id="time-left">{minute}:{second}</p>
            <div id="buttons-container">
                <button onClick={() => handleStartStop()} id="start_stop">{isRunning ? "STOP" : "START"}</button>
                <button onClick={resetTimer} id="reset">RESET</button>
            </div>
        </div>
    )
}