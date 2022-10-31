import React from 'react'
import Die from './Die'
import Confetti from 'react-confetti'



const allNewDice = ()=> {
  const newArray = []
  for(let i = 0; i < 10; i++){
    newArray.push({value:Math.floor((Math.random() * 6) + 1),isHeld:false,id:i})
  }
  return newArray  
}




const App = () =>{
  const [numbers,setNumbers] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)

  React.useEffect(()=>{

    const checkValue = values =>{
      return values.every(number => number.value)
    }
    //This will set the tenzies state to true if all the tenzies are held and all tenzies values are the same
    setTenzies(false)
    if(numbers.every(number => number.isHeld)&& checkValue(numbers)){
      setTenzies(true)
      console.log('You won!')
    }
    // numbers.every(number => number.isHeld)&& checkValue(numbers) ? setTenzies(true) : null
    
  },[numbers])



  const rollDice = ()=> {
    if(tenzies){
      setNumbers(allNewDice())
    }else{
      setNumbers(prevState => prevState.map( number => {
        return number.isHeld ? number : {...number , value: Math.floor((Math.random() * 6) + 1)} 
      }))
    }
  }

  const holdDice = id =>{
    setNumbers(prevState => (
      prevState.map(number => {
        return number.id === id ? {...number, isHeld:!number.isHeld} : number
      }))
    )
  }

  // console.log(numbers)


  const newDies = numbers.map(number => <Die key={number.id} value={number.value} isHeld={number.isHeld} holdDice={holdDice} id={number.id}/>)

  return(
    <main className='main'>
    {tenzies && <Confetti/>}
    
    <div className='game-info'>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </div>
      <div className='wrapper'>
        {newDies}
      </div>
      <button className='roll-btn' onClick={rollDice}> {tenzies ? "New Game" :  "Roll"}</button>
    </main>
    )
}


export default App