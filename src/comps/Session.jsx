export function Session({ decrement, increment, time }){
    return (
        <div id="session-label">
          Session Length
          <div className="increment-decrement-container">
            <button onClick={decrement} className="decrement" id="session-decrement">Decrement</button>
            <p id="session-length">{time}</p>
            <button onClick={increment} className="increment" id="session-increment">Increment</button>
          </div>
        </div>
    )
}