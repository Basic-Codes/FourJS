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

    // FIXME: Remove socketIO testing
    const [testText, setTestText] = useState("");
    const [receivedTestText, setReceivedTestText] = useState("");

    useEffect(() => {
        if (socket) {
            // const peer = new Peer(getParam("user_id"), {
            //     host: "/",
            //     port: "3002",
            // });
            const peer = new Peer(getParam("user_id"));
            setTimeout(() => {
                var conn = peer.connect("mobile-user");

                conn.on("open", (id) => {
                    conn.send("hi!");
                });
            }, 1000);

            peer.on("connection", function (conn) {
                conn.on("data", function (data) {
                    // Will print 'hi!'
                    console.log(data);
                    alert(data);
                });
            });

            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    // console.log(stream);
                    setStream(stream);

                    // if (userAudio?.current) {
                    //     userAudio.current.srcObject = stream;
                    // }

                    // peer.on("open", (id) => {
                    //     peer.send("hi!");
                    //     console.log("peer open | peer id:", peer.id);
                    //     socket.emit("voice-chat-join", "imaginary-room", id);
                    // });
                    peer.on("call", (call) => {
                        call.answer(stream);
                        call.on("stream", (userStream) => {
                            console.log("userStream", userStream);
                            if (userAudio?.current) {
                                userAudio.current.srcObject = userStream;
                            }
                        });
                    });

                    socket.on("user-connected", (userId) => {
                        console.log("A user has joined", userId);
                        alert("A user has joined", userId);
                        // connectToNewUser(userId, stream);
                        setTimeout(() => {
                            connectToNewUser(userId, stream);
                        }, 5000);
                    });
                });

            function connectToNewUser(userId, stream) {
                const call = peer.call(userId, stream);

                call.on("stream", (otherStream) => {
                    console.log("otherStream", otherStream);
                    if (userAudio?.current) {
                        userAudio.current.srcObject = otherStream;
                    }
                });

                peers[userId] = call;
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
            {/* <audio ref={userAudio} autoPlay></audio> */}
            <audio ref={userAudio} autoPlay controls>
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

export default VoiceChat;
