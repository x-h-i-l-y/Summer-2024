import {forwardRef, LegacyRef, useRef, useState} from 'react'
import './App.css'
import useDebounce from "./hook/useDebounce.tsx";
import useThrottle from "./hook/useThrottle.tsx";

const MyInput =
    forwardRef((props, ref: LegacyRef<HTMLInputElement>) => {
        return (
            <input className={'inputBox'}
                   {...props}
                   ref={ref}
            />
        )
    })

function App() {
    const [wordsInput, setWordsInput] = useState<string>('')
    const inputBox = useRef<HTMLInputElement>(null)
    const inputBox2 = useRef<HTMLInputElement>(null)

    return (
        <div id={'main'}>
            <div id={"showWords"}>
                <div id={"word"}>You input:</div>
                <div id={"input"}>{wordsInput}</div>
            </div>
            <div className={"buttonAndInput"}>
                <MyInput ref={inputBox}></MyInput>
                <button className={'button'} onClick={useThrottle(() => {
                    if (inputBox.current) {
                        setWordsInput(inputBox.current.value + '  (From 1)');
                        console.log(inputBox.current.value)
                    }
                }, 500)}>
                    Submit
                </button>
            </div>
            <div className={"buttonAndInput"} id={'second'}>
                <MyInput ref={inputBox2}></MyInput>
                <button className={'button'} onClick={useDebounce(() => {
                    if (inputBox2.current) {
                        setWordsInput(inputBox2.current.value + '  (From 2)');
                        console.log(inputBox2.current.value)
                    }
                }, 500)}>
                    Submit
                </button>
            </div>
        </div>
    )
}


export default App
