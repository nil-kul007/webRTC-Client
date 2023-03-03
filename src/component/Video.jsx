import React, { useEffect, useRef } from 'react'

const VideoPlay = ({stream}) => {
  const videoRef = useRef()

  useEffect(() => {
    videoRef.current.srcObject = stream
  }, [stream])

  return (
    <video
      muted={true}
      controls controlsList="nodownload noremoteplayback noplaybackrate foobar"
      width={'320px'}
      autoPlay
      ref={videoRef}
      controller={"true"}
      />
  )
}

export default VideoPlay