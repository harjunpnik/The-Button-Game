import React from 'react'
import userService from './services/user'

function App() {

function testClick(){
  console.log("test")
  userService
    .get("2e74c945aa241007e385e9d9761623327fd5614c5aae06ed46334701ba2c934f")
    .then(res => {
      console.log(res)
  })
}

  return (
    <div>
      test
      <button onClick={() => testClick()}>test</button>
    </div>
  );
}

export default App;
