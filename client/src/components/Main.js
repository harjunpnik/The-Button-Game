import React, { useState, useEffect } from 'react'
import userService from '../services/user'
import clickService from '../services/click'

function Main() {

// TODO add validation on frontend of methods 
// TODO Loading animation?
    
  const [user, setUser] = useState(null)
  const [nextPrize, setNextPrize] = useState(null)
  const [points, setPoints] = useState(null)

    useEffect(() => {
        const buttonGameUser = window.localStorage.getItem('buttonGameUser')
        if(buttonGameUser){
          setUser(buttonGameUser)
          userService
            .get(buttonGameUser)
              .then(res => {
                setPoints(res.data.points)
              })
          
        } else{
          userService
            .create()
            .then(res => {
              console.log(res)
              console.log(res.data.user)
              saveUserToLocalStorage(res.data.user)
              setUser(res.data.user)
              setPoints(res.data.points)
            })
        }
      }, [])
    
      function saveUserToLocalStorage(id){
        window.localStorage.setItem(
          'buttonGameUser', id
        )
      }
    
    
      function testClick(){
        console.log("test")
        console.log(user)
        userService
            .resetUser(user)
            .then(res => {
                setPoints(res.points)
            })
    
      }
    
      const clickButton = () =>{
        console.log("Click Test")
        clickService
        .updateClicks(user)
          .then(res => {
            console.log(res)
            setPoints(res.points)
            setNextPrize(res.nextPrize)
          })
    
      }

    const mainStyle = {
        backgroundColor: '#311b92 ',
        height: '90vh',
        width: '100vw',
        position: 'absolute'
    }

    const containerStyle = {
        margin: '5%',
        backgroundColor: 'white',
        textAlign: 'center'
    }

    const pointStyle = {
        margin: '0',
        fontSize: '200px',
        fontWeight: 'bold'
    }

    const pointTextStyle = {
        margin: '0',
        fontSize: '100px',
        fontWeight: 'bold'
    }

    return (
        <div style={mainStyle} id="background">
        
            <div style={containerStyle} id="contentContainer">
                
                <p style={pointStyle}> {points} </p>

                <p style={pointTextStyle}> POINTS </p>

                <button> click </button>

                <p style={pointTextStyle}> Amount of clicks <br/> to next prize: <br/> {nextPrize} </p>

                <br/>
                <button onClick={() => testClick()}>test</button>
                <br/>
                click test
                <button onClick={() => clickButton()}>clcik</button>

                <div>User: {user}</div>
                <div>Clicks to next prize: {nextPrize} </div>
                <div>amount of points: {points}</div>

            </div>

        </div>
    )
}

export default Main
