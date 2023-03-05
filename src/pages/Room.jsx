import { memo, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext"
import VideoPlay from '../component/Video'


const Room = () => {
  const { id } = useParams();
  const { ws, me, peers, getUserType } = useContext(RoomContext);

  useEffect(() => {
    if (me) {
      console.log('Join the room ', id)
      ws.emit('join-room', { roomId: id, peerId: me._id })
    }
  }, [id, me, ws])

  return (
    <div className='row'>
      <div className="alert alert-primary" role="alert">
        <p className="fw-bold">{`Room Id : ${id}`}</p>
        <p className="fw-bold">{`User Type : ${getUserType}`}</p>
        {/* <p className="fw-bold">{`UserID : ${me._id}`}</p> */}
      </div>
      <div className="alert alert-warning" role="alert">
        {Object.values(peers).map((peer, i) => (
          <div key={i} >
            <VideoPlay stream={peer.stream} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Room)