import { memo, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext"
import VideoPlay from '../component/Video'


const Room = () => {
  const videoRef = useRef()
  const { id, isUser } = useParams();
  const { ws, me, videoStream, screenStream, shareScreen, peers } = useContext(RoomContext);

  useEffect(() => {
    if (me) {
      console.log('Join the room ', id)
      ws.emit('join-room', { roomId: id, peerId: me._id })
    }
    if (screenStream) videoRef.current.srcObject = screenStream
  }, [id, me, screenStream, ws])

  return (
    <div className='row'>
      <div className="alert alert-primary" role="alert">
        {`Room Id : ${id}`}
      </div>
      {/* <div className="alert alert-info" role="alert">
        <div className="row">
          <div className="col-6">
            {isUser === '1' ? (
              <button onClick={shareScreen} >Share Screen</button>
            ) : null}
            {isUser === '0' ? (
              <video muted={true} controls controlsList="nodownload noremoteplayback noplaybackrate foobar" width={'512px'} autoPlay ref={videoRef} controller={true} />
            ) : null}
          </div>
          <div className="col-6">
            <video muted={true} controls controlsList="nodownload noremoteplayback noplaybackrate foobar" width={'512px'} autoPlay ref={videoRef} />
          </div>
        </div>
      </div> */}
      <div className="alert alert-warning" role="alert">
       <VideoPlay stream={videoStream} />
       {Object.values(peers).map( peer => (
        <VideoPlay stream={peer.stream} />
       ))}
      </div>
    </div>
  )
}

export default memo(Room)