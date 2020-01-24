import React, { useState, useEffect } from 'react'
import userService from '../services/user'
import clickService from '../services/click'
import shortID from 'short-id'

function Main({points, setPoints, togglePopup, changePopupContent, showNotification}) {

// TODO add validation on frontend of methods 
// TODO Loading animation?
   
  // States for user and NextPrize, points is located in App,js and is a prop
  const [user, setUser] = useState(null)
  const [nextPrize, setNextPrize] = useState(null)

  // State for animating points 
  const [keyId, setKeyId] = useState(null)
  const [pointClassName, setPointClassName] = useState(null)

  // State for rewarded points
  const [rewardedPoints, setRewardedPoints] = useState(null)

    // On pageload search after users localstorage for 'buttonGameUser', if found then use the key, else create a new 
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
              //console.log(res)
              // save to localstorage id with key 'buttonGameUser'
              window.localStorage.setItem(
                'buttonGameUser', res.data.user
              )
              setUser(res.data.user)
              setPoints(res.data.points)
            })
        }
      }, [])
    
    // Reset users points to 20
    function resetPoints(){
      //console.log("test")
      //console.log(user)
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
    
      // Click button sends request to server and increments counter by one, removes a point from user and rewards user based on the click
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

              //console.log(res)
              //console.log(res)
              setPoints(res.points)
              console.log(res.reward)
              // no reward
              if(res.reward < 1 )
                setPointClassName('lose-points')
              else{
                setPointClassName('win-points')
                setRewardPoints(res.reward)
              }

              setNextPrize(res.nextPrize)
              setKeyId(shortID.generate())

            }).catch (error => {
              //console.log(error)
              //console.log("not enough points or invalid user id")
              //console.log("try refreshing or resetting points")
            })
        }
    
      }

    const setRewardPoints = (amount) =>{
      setRewardedPoints("+" +  amount)

      setTimeout(() => {
        setRewardedPoints(null)
      }, 500)
    }

    // Outer div style
    const mainStyle = {
        backgroundColor: '#311b92 ',
        height: '85vh',
        width: '100vw',
        position: 'absolute'
    }

    // Inner div style (container)
    const containerStyle = {
        marginTop: '1%',
        backgroundColor: 'white',
        textAlign: 'center'
    }

    // Number value style
    const pointStyle = {
        margin: '0',
        fontSize: '160px',
        fontWeight: 'bold', 
    }
    // Points text style style
    const pointTextStyle = {
        margin: '0',
        fontSize: '80px',
        fontWeight: 'bold'
    }
    // Prize text stlye style
    const prizeTextStyle = {
        margin: '0',
        fontSize: '60px',
        fontWeight: 'bold',
    }

    const rewardStyle = {
      margin: '0',
      fontSize: '160px',
      fontWeight: 'bold',
      position: 'absolute',
      color: 'green'
      
  }



    return (
        <div style={mainStyle} id="background">
        
            <div style={containerStyle} id="contentContainer">
                
                <p style={pointStyle}> <span className={pointClassName} key={keyId}>{points}</span> <span style={rewardStyle}> {rewardedPoints} </span>  </p> 

                <p style={pointTextStyle}> POINTS </p>

                <button id="gameButton" onClick={() => clickButton()} > Click </button>

                <p style={prizeTextStyle}> Amount of clicks <br/> to next prize: <br/> {nextPrize} </p>

                

            </div>
        </div>
    )
}

export default Main
