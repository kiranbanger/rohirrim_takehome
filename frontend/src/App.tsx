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
function DirectionalButton({value}){
  return (
    <button className='directional'>
      {value}
    </button>
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
    // TODO put X (or emoji) where robot should be, facing North
  }

  const y_axis = [4,3,2,1,0]
  const x_axis = [0,1,2,3,4]
  return(
    <>
      <div>
        { y_axis.map( (j) => (
          <div className='tablerow'>
            { x_axis.map( (i) => (
              <TableSpace value={[i,j]} updatePos={() => updateRobotPosition(i, j, 'S')}></TableSpace>            
            ))}
          </div>  
        ))}
      </div>
      <div>
          <DirectionalButton value='Left'></DirectionalButton> 
          <DirectionalButton value='Move'></DirectionalButton>
          <DirectionalButton value='Right'></DirectionalButton>
      </div>
    </>
  )
}

export default App
