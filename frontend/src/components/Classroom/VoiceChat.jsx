/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from "socket.io-client";
import { BACKEND_URL } from "../../helper/staticVars";
import Peer from "peerjs";
import { useQueryParams } from "react-use-query-params";
import { useStore } from "@nanostores/react";
import { $mic } from "../../stores/classroom";

const VoiceChat = ({ user_id, socket }) => {
    const { getParam } = useQueryParams();

    const mic = useStore($mic);

    const userAudioRef = useRef();
    const userAudio = userAudioRef.current;

    useEffect(() => {
        if (socket) {
            const myPeer = new Peer(user_id);

            console.log(mic ? "Mic On" : "Mic Off");

            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    // const audioTracks = stream.getAudioTracks();
                    // audioTracks.forEach((track) => {
                    //     if (!mic) {
                    //         track.enabled = false;
                    //     } else {
                    //         track.enabled = true;
                    //     }
                    // });

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

            var connectToNewUser = (userId, stream) => {
                const call = myPeer.call(userId, stream);

                call.on("stream", (otherStream) => {
                    console.log("otherStream userId", userId);
                    if (userAudio) {
                        userAudio.srcObject = otherStream;
                    }
                });
            };

            socket.on("callUser", (data) => {
                // setReceivingCall(true);
                // setCaller(data.from);
                // setName(data.name);
                // setCallerSignal(data.signal);
            });
        }
    }, [socket, mic]);

    return (
        <div>
            {/* <div>
                Voice Chat -------------------------- {mic.toString()} -{" "}
                {user_id}
            </div> */}
            <audio className="hidden" ref={userAudioRef} autoPlay controls>
                <source />
            </audio>
        </div>
    );
};

export default VoiceChat;
