import {useEffect, useRef,useState} from 'react'
function useCustomHook(startingTime) {
    
    // const STARTING_TIME = 5;
    const [text, setText] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
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
        setTimeRemaining(startingTime)
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
    return [ text, 
            timeRemaining,
            isTimeRunning,
            finalResult, textAreaRef,
            handleChange, 
            startGame];
}

export default useCustomHook