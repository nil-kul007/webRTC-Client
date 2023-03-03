import { createContext, memo, useCallback, useEffect, useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidV4 } from 'uuid';
import { PeerReducer } from './PeerReducer';
import { addPeerAction, removePeerAction } from './PeerActions';


const WS = 'http://192.168.1.121:8000';

export const RoomContext = createContext(null);


const ws =socketIO(WS);
const RoomProvider = ({children}) => {
    const navigate = useNavigate()
    const [me, setMe] = useState()
    const [videoStream, setVideoStream] = useState()
    const [screenStream, setScreenStream] = useState()
    const [customerId, setCustomerId] = useState('')
    const [ peers, dispatch] = useReducer(PeerReducer, {})

    const enterRoom = useCallback(({roomId}) => {
        navigate(`/room/${roomId}/${1}`)
        console.log('Room created with ID=> ', roomId)
    }, [navigate])

    const getUsers = useCallback(({roomId, users}) => {
        console.log(`User Joined the room: ${roomId}, all users => `, users)
    }, [])
    const removePeer = useCallback(({ peerId}) => {
        console.log(`Users left the room: ${peerId}`)
        dispatch(removePeerAction(peerId))
    },[])

    const shareScreen = () => {
        try {
            navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
                setScreenStream(stream)
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const meId = uuidV4()
        const peer = new Peer(meId)
        setMe(peer)

        try {
            navigator.mediaDevices.getUserMedia({video:true, audio:false}).then((stream) => {
                setVideoStream(stream)
            })
        } catch (err) {
            console.log('Video Error', err)
        }

        ws.on('room-created', enterRoom);
        ws.on('get-users', getUsers);
        ws.on("user-disconnected", removePeer);
        return () => {
            ws.off('room-created', enterRoom)
            ws.off('get-users', getUsers)
            ws.off("user-disconnected", removePeer);
        }
    },[enterRoom, getUsers, removePeer])

    useEffect(()=> {
        if(!me) return
        if(!videoStream) return
        
        ws.on('user-joined', ({peerId}) => {
            console.log('user-joined ===> ', peerId)
            const call = me.call(peerId, videoStream)
            call.on('stream', (peerStream) =>{
                dispatch(addPeerAction(peerId, peerStream))
            })
        })

        me.on('call', (call) => {
            call.answer(videoStream)
            call.on('stream', (peerStream) =>{
                dispatch(addPeerAction(call.peer, peerStream))
            })
        })

    }, [me, videoStream])

    console.log(peers)

    return (
        <RoomContext.Provider 
        value={{
            ws, me, peers,
            videoStream,
            screenStream,
            customerId,
            shareScreen,
            setCustomerId
        }}>
            {children}
        </RoomContext.Provider>
    )
}

export default memo(RoomProvider)