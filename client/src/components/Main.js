import React, { useState, useEffect } from 'react'
import userService from '../services/user'
import clickService from '../services/click'

function Main({points, setPoints, togglePopup, changePopupContent, showNotification}) {

// TODO add validation on frontend of methods 
// TODO Loading animation?
// Error message component
    
  const [user, setUser] = useState(null)
  const [nextPrize, setNextPrize] = useState(null)
  //const [points, setPoints] = useState(null)

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
    
    
    function resetPoints(){
      //console.log("test")
      console.log(user)
      userService
          .resetUser(user)
          .then(res => {
              setPoints(res.points)
              showNotification("Points reset to 20", false, 5000)
          }).catch (error => {
            //console.log(error)
            //console.log("too much points or invalid user id")
            showNotification("User has too much points or invalid user id", true, 5000)
          })
    
      }
    

      const clickButton = () =>{
        console.log("Click Test")

        if(points < 1){

          //console.log(points < 1, "not enough points")
          const header = "Error - Not enough points"
          const errorMessage = 
          ["You do not have enough points to play. Do you want to reset your points?",
          <br/>,
          <button onClick={() => resetPoints()}>Reset points to 20</button>
          ]
          changePopupContent(header, errorMessage)
          togglePopup()
          
        }else{

          clickService
          .updateClicks(user)
            .then(res => {

              console.log(res)
              console.log(res)
              setPoints(res.points)
              setNextPrize(res.nextPrize)

            }).catch (error => {
              console.log(error)
              console.log("not enough points or invalid user id")
              console.log("try refreshing or resetting points")
            })
        }


    
      }

    const mainStyle = {
        backgroundColor: '#311b92 ',
        height: '90vh',
        width: '100vw',
        position: 'absolute'
    }

    const containerStyle = {
        marginTop: '5%',
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

    const prizeTextStyle = {
        margin: '0',
        fontSize: '60px',
        fontWeight: 'bold'
    }



    return (
        <div style={mainStyle} id="background">
        
            <div style={containerStyle} id="contentContainer">
                
                <p style={pointStyle}  >{points} </p>

                <p style={pointTextStyle}> POINTS </p>

                <button id="gameButton" onClick={() => clickButton()} > Click </button>

                <p style={prizeTextStyle}> Amount of clicks <br/> to next prize: <br/> {nextPrize} </p>

                <br/>

            </div>
        </div>
    )
}

export default Main
