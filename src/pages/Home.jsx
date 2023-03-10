import { useContext, useState } from 'react';
import JoinButton from '../component/Button'
import { RoomContext } from '../context/RoomContext';

const Home = () => {
  const { ws, userId, setUserId } = useContext(RoomContext)
  const [warning, setWarning] = useState('')

  const createRoom = () => {
    setWarning('')
    // console.log('Create a room...')
    ws.emit('create-room', { userId: btoa(userId), userType: 'user' })
    // ws.emit('create-room', { userId })
  }
  
  return (
    <div className='row'>
      <div className="alert alert-info" role="alert">
        <JoinButton
          cutomrtIdChange={(e) => setUserId(e.target.value)}
          userId={userId}
          name={'Create Room'}
          click={() => { (userId !== '') ? createRoom() : setWarning('Enter customer ID....') }}
        />
        {warning !== '' ? (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      ) : null}
      </div>
    </div>
  )
}

export default Home