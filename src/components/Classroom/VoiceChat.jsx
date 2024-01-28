import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../../helper/staticVars";
import Peer from "peerjs";
import { useQueryParams } from "react-use-query-params";

const VoiceChat = () => {
    const { getParam } = useQueryParams();

    const userAudio = useRef();

    const [me, setMe] = useState("");
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState();

    useEffect(() => {
        if (socket) {
            // const peer = new Peer(undefined, {
            //     host: "http://127.0.0.1",
            //     port: "8080",
            // });
            const peer = new Peer(getParam("user_id"));

            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    console.log(stream);
                    setStream(stream);

                    // if (userAudio?.current) {
                    //     userAudio.current.srcObject = stream;
                    // }

                    peer.on("open", (id) => {
                        console.log("peer open | peer id:", peer.id);
                        socket.emit("voice-chat-join", "imaginary-room", id);
                    });
                    // peer.on("call", (call) => {
                    //     call.answer(stream);
                    //     // Handle audio stream
                    // });

                    socket.on("user-connected", (userId) => {
                        console.log("A user has joined", userId);
                        connectToNewUser(userId, stream);
                    });
                });

            function connectToNewUser(userId, stream) {
                const call = peer.call(userId, stream);

                call.on("stream", (userVideoStream) => {
                    if (userAudio?.current) {
                        userAudio.current.srcObject = userVideoStream;
                    }
                });

                // peers[userId] = call;
            }

            socket.on("me", (id) => {
                console.log("me", id);
                setMe(id);
            });

            socket.on("callUser", (data) => {
                setReceivingCall(true);
                setCaller(data.from);
                setName(data.name);
                setCallerSignal(data.signal);
            });
        }
    }, [socket]);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div>
            <div>Voice Chat</div>
            {/* <audio ref={userAudio} autoPlay></audio> */}
            <audio ref={userAudio} autoPlay controls>
                <source />
            </audio>
        </div>
    );
};

export default VoiceChat;
