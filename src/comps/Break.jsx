export function Break({ decrement, increment, time }){
    return (
        <div id="break-label">
          Break Length
          <div className="increment-decrement-container">
            <button onClick={decrement} className="decrement" id="break-decrement">Decrement</button>
            <p id="break-length">{time}</p>
            <button onClick={increment} className="increment" id="break-increment">Increment</button>
          </div>
        </div>
    )
}