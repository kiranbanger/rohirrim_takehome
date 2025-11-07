import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [robotLocation, setRobotLocation] = useState([0,0])

  return (
    <>
      <div>
        <TableTop robotLocation={robotLocation} setRobotLocation={setRobotLocation}/>
      </div>
    </>
  )
}

function ReportButton(){
  return ( //add function to make GET request
    <button className='report'>
      Report
    </button>
  )
}

function DirectionalButton({value}){
  return (
    <button className='directional'>
      {value}
    </button>
  )
}

function TableSpace({x,y, value='', updatePos}) {
  return (
    <button className={`tablespace ${x}xcoord ${y}ycoord`} onClick={updatePos}>
      {value}
    </button>
  );
}

function TableTop({robotLocation, setRobotLocation}){
  async function updateRobotPosition(x = 0, y = 0, f = 'N'){ // add types
    const data = {
      'x_coord' : x, 
      'y_coord' : y, 
      'facing' : f
    }
    setRobotLocation([x,y]);
    const response = await axios.post('http://localhost:3000/robots', data)
    console.log('POST API response: ', response)
  }

  const y_axis = [4,3,2,1,0]
  const x_axis = [0,1,2,3,4]
  return(
    <>
      <div>
        { y_axis.map( (j) => (
          <div className='tablerow'>
            { x_axis.map( (i) => (
              <TableSpace x={i} y={j} value={(robotLocation[0] == i && robotLocation[1] == j) ? 'R' : ''} updatePos={() => updateRobotPosition(i, j, 'S')}></TableSpace>            
            ))}
          </div>  
        ))}
      </div>
      <div>
          <DirectionalButton value='Left'></DirectionalButton> 
          <DirectionalButton value='Move'></DirectionalButton>
          <DirectionalButton value='Right'></DirectionalButton>
      </div>
      <div>
        <ReportButton/>
      </div>
    </>
  )
}

export default App
