import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [robotLocation, setRobotLocation] = useState([0,0])
  const [robotDirection, setRobotDirection] = useState('N')

  return (
    <>
      <div>
        <TableTop robotLocation={robotLocation} setRobotLocation={setRobotLocation} robotDirection={robotDirection} setRobotDirection={setRobotDirection}/>
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
function MoveButton(){
  return (
    <button className='move'>
      Move
    </button>
  )
}

function DirectionalButton({value, updateDir}){
  return (
    <button className='directional' onClick={updateDir}>
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

function TableTop({robotLocation, setRobotLocation, robotDirection, setRobotDirection}){
  async function updateRobotPosition(x = 0, y = 0){ // add types
    const data = {
      'x_coord' : x, 
      'y_coord' : y, 
      'facing' : robotDirection
    }
    setRobotLocation([x,y]);
    const response = await axios.post('http://localhost:3000/robots', data)
    console.log('POST API response: ', response)
  }
  const leftMap = {
    'N':'W',
    'E':'N',
    'S':'E',
    'W':'S'
  }
  const rightMap = {
    'N':'E',
    'E':'S',
    'S':'W',
    'W':'N'
  }
  async function updateRobotDirection(direction='left'){
    const newDir = direction == 'left' ? leftMap[robotDirection] : rightMap[robotDirection]
    console.log('NEW DIRECTION: ', newDir)
    setRobotDirection(newDir)
    console.log('New Robot Direction: ', setRobotDirection)
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
          <DirectionalButton value='Left' updateDir={() => updateRobotDirection('left')} />
          <MoveButton />
          <DirectionalButton value='Right' updateDir={() => updateRobotDirection('right')} />
      </div>
      <div>
        <ReportButton/>
      </div>
    </>
  )
}

export default App
