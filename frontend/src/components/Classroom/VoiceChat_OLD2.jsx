import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../../helper/staticVars";
import Peer from "peerjs";
import { useQueryParams } from "react-use-query-params";

const VoiceChat_OLD2 = () => {
    const { getParam } = useQueryParams();

    const userAudioRef = useRef();
    const userAudio = userAudioRef.current;

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (socket) {
            const myPeer = new Peer(getParam("user_id"));

            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    myPeer.on("open", (id) => {
                        socket.emit("voice-chat-join", "imaginary-room", id);
                    });
                    myPeer.on("call", (call) => {
                        call.answer(stream);
                        call.on("stream", (otherStream) => {
                            if (userAudio) {
                                userAudio.srcObject = otherStream;
                            }
                        });
                    });

                    socket.on("user-connected", (data) => {
                        console.log("A user has joined", data);

                        setTimeout(() => {
                            if (!data.self) {
                                connectToNewUser(data.data, stream);
                            }
                        }, 1000);
                    });
                });

            function connectToNewUser(userId, stream) {
                const call = myPeer.call(userId, stream);

                call.on("stream", (otherStream) => {
                    console.log("otherStream userId", userId);
                    if (userAudio) {
                        userAudio.srcObject = otherStream;
                    }
                });
            }

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
            <audio ref={userAudioRef} autoPlay controls>
                <source />
            </audio>
        </div>
    );
};

export default VoiceChat_OLD2;
