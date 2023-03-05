import { useContext, useState } from 'react';
import JoinButton from '../component/Button'
import { RoomContext } from '../context/RoomContext';

const CustomerSupport = () => {
  const { ws, userId, setUserId } = useContext(RoomContext)
  const [warning, setWarning] = useState('')

  const createRoom = () => {
    setWarning('')
    // console.log('Create a room...')
    ws.emit('create-room', { userId: window.btoa(userId), userType: 'support' })
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

export default CustomerSupport