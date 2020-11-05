/**
 * Challenge: build the basic structure of our game
 *
 * 1. <h1> title at the top
 * 2. <textarea> for the box to type in
 *      (tip: React normalizes <textarea /> to be more like <input />,
 *      so it can be used as a self-closing element and uses the `value` property
 *      to set its contents)
 * 3. <h4> ti display the amount of time remaining
 * 4. <button> to start the game
 * 5. Another <h1> to display the word count
 */
/**
 * Challenge: Using hooks, track the state of the text in the textarea on every keystroke
 * To verify it's working, you could just console.log the state on every change
 * 
 * https://scrimba.com/p/p7P5Hd/cW8Jdfy
 */

 /**
 * Challenge:
 * 
 * 1. Create state to hold the current value of the countdown timer.
 *    Display this time in the "Time Remaining" header
 */

 /**
 * Challenge:
 * 
 * 1. Create state to hold the current value of the countdown timer.
 *    Display this time in the "Time Remaining" header
 * 
 * 2. Set up an effect that runs every time the `timeRemaining` changes
 *    The effect should wait 1 second, then decrement the `timeRemaining` by 1
 * 
 *    Hint: use `setTimeout` instead of `setInterval`. This will help you avoid
 *    a lot of extra work.
 * 
 *    Warning: there will be a bug in this, but we'll tackle that next
 */

 /**
 * Challenge:
 * 
 * Make it so clicking the Start button starts the timer instead of it starting on refresh
 * (Hint: use a new state variable to indicate if the game should be running or not)
 */

 /**
 * Challenge:
 * 
 * Make the input box focus (DOM elements have a method called .focus()) 
 * immediately when the game starts
 */

import React, {useEffect, useRef, useState} from 'react'

function App() {
    const STARTING_TIME = 5;
    const [text, setText] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunnung] = useState(false)
    const [finalResult, setFinalResult] = useState(0)
    const textAreaRef = useRef(null);
    
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    // console.log("text",text);
    function getNumberOfWords(text) {
        let wordsArr = text.trim().split(' ');
        console.log(wordsArr.length)
        return wordsArr.filter(word => word !== "").length;
    }

    function startGame() {
        setIsTimeRunnung(true)
        setTimeRemaining(STARTING_TIME)
        setText('')
        textAreaRef.current.disabled = false
        textAreaRef.current.focus();
    }
    function endGame() {
        setIsTimeRunnung(false)
        setFinalResult(getNumberOfWords(text))
    }
    useEffect(() => {
        
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(prevTimeRemaining => {
                    return prevTimeRemaining - 1
                });
            }, 1000);
        } else if(timeRemaining === 0) {
            endGame()
        }
        
    }, [timeRemaining, isTimeRunning])
    
    return (
        <>
        <h1>Speed typing game</h1>
        <textarea ref={textAreaRef} disabled={!isTimeRunning } value={text} onChange={handleChange}/>
        <h4>Time remaining: {timeRemaining}</h4>
        {/* <button onClick={() => getNumberOfWords(text)}>Start</button> */}
        <button disabled={isTimeRunning} onClick={() => startGame(text)}>Start</button>
        <h1>Word count: {finalResult}</h1>
        </>
    )
}
export default App