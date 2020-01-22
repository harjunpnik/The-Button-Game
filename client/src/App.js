import React, {useState, useEffect } from 'react'
import userService from './services/user'
import clickService from './services/click'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'

function App() {

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

  return (
    <div>

      <Header/>

      test
      <button onClick={() => testClick()}>test</button>
      <br/>
      click test
      <button onClick={() => clickButton()}>clcik</button>


      <div>User: {user}</div>
      <div>Clicks to next prize: {nextPrize} </div>
      <div>amount of points: {points}</div>


      <Footer/>

    </div>
  )
}

export default App
