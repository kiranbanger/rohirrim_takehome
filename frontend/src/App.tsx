import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TableTop/>
      </div>
    </>
  )
}

function TableSpace({value, updatePos}) {
  return (
    <button className='tablespace' onClick={updatePos}>
      {value}
    </button>
  );
}

function TableTop(){
  async function updateRobotPosition(x = 0, y = 0, f = 'N'){ // add types
    const data = {
      'x_coord' : x, 
      'y_coord' : y, 
      'facing' : f
    }

    const response = await axios.post('http://localhost:3000/robots', data)
    console.log('POST API response: ', response)
  }
  return(
    <>
      <div className='tablerow'>
        <TableSpace value={[0,4]} updatePos={() => updateRobotPosition(0, 4, 'S')}></TableSpace>
        <TableSpace value={[1,4]} updatePos={() => console.log('Clicked TableSpace [0,0]')}></TableSpace>
        <TableSpace value={[2,4]} updatePos={() => console.log('Clicked TableSpace [0,0]')}></TableSpace>
        <TableSpace value={[3,4]} updatePos={() => console.log('Clicked TableSpace [0,0]')}></TableSpace>
        <TableSpace value={[4,4]} updatePos={() => console.log('Clicked TableSpace [0,0]')}></TableSpace>
      </div>
      <div className='tablerow'>
        <TableSpace value={[0,0]} updatePos={() => console.log('Clicked TableSpace [1,0]')}></TableSpace>
        <TableSpace value={[0,0]} updatePos={() => console.log('Clicked TableSpace [1,0]')}></TableSpace>
        <TableSpace value={[0,0]} updatePos={() => console.log('Clicked TableSpace [1,0]')}></TableSpace>
        <TableSpace value={[0,0]} updatePos={() => console.log('Clicked TableSpace [1,0]')}></TableSpace>
        <TableSpace value={[0,0]} updatePos={() => console.log('Clicked TableSpace [1,0]')}></TableSpace>
      </div>
    </>
  )
}

export default App
