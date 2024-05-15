import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const[text,setText]=useState('');
  const[userinput,setUserinput]=useState('');
  const[timeleft,setTimeleft]=useState('60')
  const[started,setStarted]=useState(false)
  const[wordtyped,setWordtyped]=useState(0)
  const[chartyped,setChartyped]=useState(0)
  const[errors,setErrors]=useState(0);


  const texttotype="hello everyone give this test in a minute"
  useEffect(()=>{
    if(timeleft>0 &&started){
      setTimeout(() => {
        setTimeleft(prevTime=>prevTime-1)
        
      }, 1000);
    }
    else{
      setStarted(false)
      calculateStats()
    }
  },[timeleft,started])
  useEffect(()=>{
    let errorcount=0;
    for(let i=0; i<userinput.length; i++){
      if(userinput[i]!==texttotype[i]){
        errorcount++;
      }
    }
    setErrors(errorcount >texttotype.length ?texttotype.length:errorcount)
  },[userinput,texttotype])
  const handlestart=()=>{
    setTimeleft(60);
    setStarted(true)
    setWordtyped(0)
    setChartyped(0)
    setErrors(0)
    setText(texttotype)

  }
  const calculateStats=()=>{
    const typeword=userinput.trim().split(' ').filter(Boolean).length;
    const typechar=userinput.length;
    setWordtyped(typeword);
    setChartyped(typechar)
  }
  const handlechange=(e)=>{
    const {value}=e.target;
    setUserinput(value)

  }
  const calculateWPM=()=>{
    const min=60/(60-timeleft);
    const WPM=Math.round(wordtyped/min)
    return WPM
  }
  const calculateCPM=()=>{
    const min=60/(60-timeleft)
    const cpm=Math.round(chartyped/min)
    return cpm;
  }
  const calculateAccuracy=()=>{
    const accuray=((chartyped-errors)/chartyped)*100
    return isNaN(accuray)?0:accuray.toFixed(2)
  }
 

  return (
    <>
    <div className="App">
    <h1>Speed Typing Test</h1>
    <div>
      <p>{text}</p>
      <input type="text"  disabled={!started ||timeleft===0 } value={userinput}
      onChange={handlechange}/>
    </div>
    <button onClick={handlestart} disabled={started && timeleft !== 0}>
  {started ? 'Restart' : 'Start'}
</button>

    <div className="stats">
      <p>Time Left:{timeleft}</p>
      <div>
        <p>WPM:{calculateWPM()}</p>
        <p>CPM:{calculateCPM()}</p>
        <p>Accuracy:{calculateAccuracy()}</p>
        <p>Error{(errors)}</p>

      </div>
    </div>
    </div>
    </>
  )
}

export default App
