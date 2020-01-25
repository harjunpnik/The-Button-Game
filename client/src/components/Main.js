import React, { useState, useEffect } from 'react'
import userService from '../services/user'
import clickService from '../services/click'
import shortID from 'short-id'

function Main({points, setPoints, togglePopup, changePopupContent, showNotification, user, setUser}) {
   
  // States for NextPrize, points and user is located in App,js and is a prop
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
        //set user and fecth points from db
        setUser(buttonGameUser)
        userService
          .get(buttonGameUser)
          .then(res => {
            setPoints(res.data.points)
          })
          
      } else{
        // Create new and save to localstorage id and set state of user and points
        userService
          .create()
          .then(res => {
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
    userService
      .resetUser(user)
      .then(res => {
        setPoints(res.points)
        // Show user that it succeded
        showNotification("Points reset to 20", false, 5000)
      }).catch (error => {
        // Show user that it failed
        showNotification("User has too much points or invalid user id", true, 5000)
      })
  }
    
  // Click button sends request to server and increments counter by one, removes a point from user and rewards user based on the click
  const clickButton = () =>{
    // If user doesn't have enough points
    if(points < 1){
      // Set header text and info message for popup window
      const header = "Not enough points"
      const errorMessage = 
        ["You do not have enough points to play. Do you want to reset your points?",
        <br/>,
        <button onClick={() => resetPoints()}>Reset points to 20</button>
        ]
      // Change popup window content and show it 
      changePopupContent(header, errorMessage)
      togglePopup()
     
    // If user has enough points  
    }else{
      clickService
        .updateClicks(user)
        .then(res => {
          setPoints(res.points)

          // no reward
          if(res.reward < 1 )
            // Set class depending on win or lose
            setPointClassName('lose-points')

          // reward
          else{
            // Set class depending on win or lose
            setPointClassName('win-points')
            // Call function to show rewarded points for half a second
            setRewardPoints(res.reward)
          }
          // Update clicks to next prize
          setNextPrize(res.nextPrize)
          // Generate new key for points to play css animation
          setKeyId(shortID.generate())

        }).catch (error => {
          //console.log(error)
          //console.log("not enough points or invalid user id")
          //console.log("try refreshing or resetting points")
        })
    }
    
  }

  // Shows rewarded points for half a second
  const setRewardPoints = (amount) =>{
    setRewardedPoints("+" +  amount)

    // Timer for half a second
    setTimeout(() => {
      setRewardedPoints(null)
    }, 500)
  }

  return (
    <div  id="background" >
      
      <div id="contentContainerInner">
                
        <p id="pointStyle"> <span className={pointClassName} key={keyId}>{points}</span> <span id="rewardStyle"> {rewardedPoints} </span>  </p> 

        <p id="pointTextStyle"> POINTS </p>

        <button id="gameButton" onClick={() => clickButton()} > Click </button>

        <p id="prizeTextStyle"> Clicks to next prize: <br/> {nextPrize} </p>

      </div>
    </div>
  )
}

export default Main
