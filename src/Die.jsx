import React from 'react'

const Die = props =>{
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(<p className='die' style={styles} onClick={() =>{props.holdDice(props.id)}}>{props.value} </p>
)}

export default Die