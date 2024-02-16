import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../../helper/staticVars";
import Peer from "peerjs";
import { useQueryParams } from "react-use-query-params";

const VoiceChat_OLD = () => {
    const { getParam } = useQueryParams();

    const userAudioRef = useRef();
    const userAudio = userAudioRef.current;

    const [me, setMe] = useState("");
    const [socket, setSocket] = useState(null);
    const [stream, setStream] = useState();

    // FIXME: Remove socketIO testing
    const [testText, setTestText] = useState("");
    const [receivedTestText, setReceivedTestText] = useState("");

    useEffect(() => {
        if (socket) {
            const peer = new Peer(getParam("user_id"));

            setTimeout(() => {
                var conn = peer.connect("mobile_user");
                conn.on("open", (id) => {
                    conn.send("hi!");
                });
            }, 1000);

            peer.on("connection", function (conn) {
                conn.on("data", function (data) {
                    console.log(data);
                    alert(data);
                });
            });

            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    // console.log(stream);
                    setStream(stream);

                    // if (userAudio) {
                    //     userAudio.srcObject = stream;
                    // }

                    peer.on("open", (id) => {
                        console.log("peer open | peer id:", peer.id);
                        socket.emit("voice-chat-join", "imaginary-room", id);
                    });
                    peer.on("call", (call) => {
                        call.answer(stream);
                        call.on("stream", (userStream) => {
                            console.log("userStream", userStream);
                            if (userAudioRef?.current) {
                                userAudioRef.current.srcObject = userStream;
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
                console.log("Calling ", userId);
                const call = peer.call(userId, stream);

                call.on("stream", (otherStream) => {
                    console.log("otherStream", otherStream);
                    if (userAudio) {
                        userAudio.srcObject = otherStream;
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

    // FIXME: Remove socketIO testing
    useEffect(() => {
        if (socket) {
            socket.on("test-text", (data) => {
                if (!data.self) {
                    setReceivedTestText(data.data);
                }
            });
        }
    }, [socket]);

    // FIXME: Remove socketIO testing
    useEffect(() => {
        if (socket) {
            socket.emit("test-text", testText);
        }
    }, [testText]);

    return (
        <div>
            <div>Voice Chat</div>
            {/* <audio ref={userAudioRef} autoPlay></audio> */}
            <audio ref={userAudioRef} autoPlay controls>
                <source />
            </audio>

            {/* FIXME: Remove socketIO testing */}
            <input
                className="border-2"
                type="text"
                onChange={(e) => setTestText(e.target.value)}
            />
            <div className="text-xl font-semibold text-emerald-500">
                {receivedTestText}
            </div>
        </div>
    );
};

export default VoiceChat_OLD;
