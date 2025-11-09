import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

enum RobotDirection {
  N ='N',
  E ='E', 
  S = 'S', 
  W = 'W',
}
function App() {
  const [robotLocation, setRobotLocation] = useState([0,0])
  const [robotDirection, setRobotDirection] = useState<RobotDirection>(RobotDirection.N)

  return (
    <>
      <div>
        Current Direction: {robotDirection}
      </div>
      <div>
        <TableTop robotLocation={robotLocation} setRobotLocation={setRobotLocation} robotDirection={robotDirection} setRobotDirection={setRobotDirection}/>
      </div>
    </>
  )
}

interface ReportButtonProps {
  robotLocation: number[], 
  robotDirection : RobotDirection
}
function ReportButton({robotLocation, robotDirection}: ReportButtonProps){
  const getReport = () => {
    alert(`Robot is at ${robotLocation[0]}, ${robotLocation[1]} and is facing ${robotDirection}.`)
  } 
  return (
    <button className='report' onClick={getReport}>
      Report
    </button>
  )
}
function MoveButton({moveRobot}: {moveRobot: () => void}){
  return (
    <button className='move' onClick={moveRobot}>
      Move
    </button>
  )
}

interface DirectionalButtonProps {
  value: string,
  updateDir: () => void
}
function DirectionalButton({value, updateDir}: DirectionalButtonProps){
  return (
    <button className='directional' onClick={updateDir}>
      {value}
    </button>
  )
}

interface TableSpaceProps {
  x: number,
  y: number, 
  isOccupied: boolean, 
  robotDirection: RobotDirection,
  updatePos : (x: number, y: number) => void
}
function TableSpace({x,y, isOccupied=false, robotDirection, updatePos}: TableSpaceProps) {
  return (
    <button className={`tablespace ${x}xcoord ${y}ycoord`} onClick={() => updatePos(x,y)}>
      {isOccupied && (
        <>🤖 <span className={`directional-arrow ${robotDirection == 'N' ? 'robot-direction-n' : robotDirection == 'E' ? 'robot-direction-e' : robotDirection == 'W' ? 'robot-direction-w' : ''}`}> V </span></>
      )}
    </button>
  );
}

interface TableTopProps{
  robotLocation: number[], 
  setRobotLocation: (x: number[]) => void, 
  robotDirection: RobotDirection, 
  setRobotDirection: (x: RobotDirection) => void 
}
function TableTop({robotLocation, setRobotLocation, robotDirection, setRobotDirection} : TableTopProps){
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/robots')
      //console.log('GET response: ', response.data[0])
      const data = response.data[0]
      // TODO - add validation checks for x,y, facing
      setRobotLocation([data.x_coord, data.y_coord])
      setRobotDirection(data.facing)
    }
    fetchData()
  }, [])

  async function updateRobotPosition(x = 0, y = 0){
    const data = {
      'x_coord' : x, 
      'y_coord' : y, 
      'facing' : robotDirection
    }
    setRobotLocation([x,y]);
    const response = await axios.post('http://localhost:3000/robots', data)
    //console.log('POST API response: ', response)
  }
  const leftMap = {
    [RobotDirection.N]: RobotDirection.W,
    [RobotDirection.E]: RobotDirection.N,
    [RobotDirection.S]: RobotDirection.E,
    [RobotDirection.W]: RobotDirection.S
  }
  const rightMap = {
    [RobotDirection.N]: RobotDirection.E,
    [RobotDirection.E]: RobotDirection.S,
    [RobotDirection.S]: RobotDirection.W,
    [RobotDirection.W]: RobotDirection.N
  }
  async function updateRobotDirection(buttonVal='left'){
    const newDir = buttonVal == 'left' ? leftMap[robotDirection] : rightMap[robotDirection]
    console.log('NEW DIRECTION: ', newDir)
    setRobotDirection(newDir)
  }

  async function moveRobot(){
    const [ x, y ]= robotLocation
    let [ newX, newY ] = robotLocation
    console.log('current position: ', x, y)
    if(robotDirection == RobotDirection.E && x < 4){
      newX = x + 1
    }
    if(robotDirection == RobotDirection.W && x > 0){
      newX = x-1
    }
    if(robotDirection == RobotDirection.N && y < 4){
      newY = y+1
    }
    if(robotDirection == RobotDirection.S && y > 0){
      newY = y-1
    }
    setRobotLocation([newX, newY])
    console.log('new position: ', newX, newY )
    // TODO add warning if out of bounds
    updateRobotPosition(newX, newY)
  }
  const y_axis = [4,3,2,1,0]
  const x_axis = [0,1,2,3,4]
  return(
    <div onKeyUp={(e) => {
      if (e.key == 'ArrowLeft') {
        updateRobotDirection('left')
      }
      if (e.key == 'ArrowRight') {
        updateRobotDirection('right')
      }
      if (e.key == 'ArrowUp'){
        moveRobot()
      }
      }}>
      <div>
        { y_axis.map( (j) => (
          <div className='tablerow'>
            { x_axis.map( (i) => (
              <TableSpace x={i} y={j} isOccupied={(robotLocation[0] == i && robotLocation[1] == j)} robotDirection={robotDirection} updatePos={updateRobotPosition} />            
            ))}
          </div>  
        ))}
      </div>
      <div>
          <DirectionalButton value='Left' updateDir={() => updateRobotDirection('left')} />
          <MoveButton moveRobot={moveRobot}/>
          <DirectionalButton value='Right' updateDir={() => updateRobotDirection('right')} />
      </div>
      <div>
        <ReportButton robotDirection={robotDirection} robotLocation={robotLocation}/>
      </div>
    </div>
  )
}

export default App
