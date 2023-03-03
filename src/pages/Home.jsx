import { useContext, useState } from 'react';
import JoinButton from '../component/Button'
import { RoomContext } from '../context/RoomContext';

const Home = () => {
  const { ws, customerId, setCustomerId } = useContext(RoomContext)
  const [warning, setWarning] = useState('')
  const createRoom = () => {
    setWarning('')
    console.log('Create a room...')
    ws.emit('create-room', { customerId })
  }
  return (
    <div className='row'>
      {warning !== '' ? (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      ) : null}
      <div className="alert alert-info" role="alert">
        <JoinButton
          cutomrtIdChange={(e) => setCustomerId(e.target.value)}
          customerId={customerId}
          name={'Create Room'}
          click={() => { (customerId !== '') ? createRoom() : setWarning('Enter customer ID....') }}
        />
      </div>
    </div>
  )
}

export default Home