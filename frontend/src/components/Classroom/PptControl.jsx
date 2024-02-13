import { useEffect } from "react";
import { useState } from "react";
import { BACKEND_URL } from "../../helper/staticVars";
import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "wouter";
import axios from "axios";
import { getAxiosHeader } from "../../helper/utils";

const xOffset = 600;
const yOffset = 100;

const PptControl = ({ setCurrPptImgUrl }) => {
    const params = useParams();

    const fileUploadInputRef = useRef();
    const fileUploadInput = fileUploadInputRef.current;

    const [uploadImage, setUploadImage] = useState(null);
    const [currImageIndex, setCurrImageIndex] = useState(0);
    const [images, setImages] = useState([
        `${BACKEND_URL}/images/image_01.jpg`,
        `${BACKEND_URL}/images/image_02.jpg`,
        `${BACKEND_URL}/images/image_03.jpg`,
        `${BACKEND_URL}/images/image_04.jpg`,
        `${BACKEND_URL}/images/image_05.jpg`,
    ]);

    const getSessionPptImages = async () => {
        axios
            .get(
                `${BACKEND_URL}/api/upload/ppt-image?code=${params?.session_code}`,
                {
                    headers: getAxiosHeader(),
                }
            )
            .then(function (response) {
                console.log(response?.data);
                if (response?.data?.sessionPpts) {
                    setImages(
                        response?.data?.sessionPpts?.map(
                            (ppt_path) => `${BACKEND_URL}/${ppt_path}`
                        )
                    );
                } else {
                    console.log("Session Ppts not found");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleFileChange = (e) => {
        console.log(e.target.files);
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setUploadImage(img);
    };
    const handleUpload = async () => {
        let formData = new FormData();
        formData.append("code", params?.session_code);
        formData.append("file", uploadImage.data);

        axios
            .post(`${BACKEND_URL}/api/upload/ppt-image`, formData, {
                headers: getAxiosHeader(true),
            })
            .then(function (response) {
                if (response?.data?.success) {
                    console.log(response?.data?.msg);
                    setUploadImage(null);
                    getSessionPptImages();
                } else {
                    console.error(response?.data?.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        document.onkeydown = (e) => {
            {
                e = e || window.event;

                if (e.keyCode == "37" || e.keyCode == "38") {
                    setCurrImageIndex((currImageIndex) =>
                        (currImageIndex - 1) % images?.length < 0
                            ? images?.length - 1
                            : (currImageIndex - 1) % images?.length
                    );
                } else if (e.keyCode == "40" || e.keyCode == "39") {
                    setCurrImageIndex(
                        (currImageIndex) =>
                            (currImageIndex + 1) % images?.length
                    );
                }
            }
        };
    }, []);

    useEffect(() => {
        setCurrPptImgUrl(images[currImageIndex]);
    }, [currImageIndex]);

    useEffect(() => {
        getSessionPptImages();
    }, []);

    return (
        <div className="">
            <div className="grid place-items-center min-h-screen min-w-screen bg-vr-white bg-i1">
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2
                            bg-white min-h-[70vh] w-52 rounded-r-xl overflow-hidden p-2"
                >
                    {!uploadImage ? (
                        <div
                            onClick={() => fileUploadInput?.click()}
                            className="border-2 border-dashed border-gray-500 font-semibold text-center px-5 py-2 cursor-pointer mb-2"
                        >
                            Upload Image
                        </div>
                    ) : (
                        <div>
                            <div
                                onClick={() => setUploadImage(null)}
                                className="relative border-2 border-dashed border-[#4B4DF7] font-semibold text-center p-2 cursor-pointer mb-2 group"
                            >
                                <div className="absolute-center h-full w-full bg-[#3434349e] hidden group-hover:block">
                                    <div className="absolute-center p-4 rounded-full bg-gray-400">
                                        <RxCross2 className="absolute-center text-xl text-white" />
                                    </div>
                                </div>
                                <img
                                    className="w-full"
                                    src={uploadImage.preview}
                                    alt=""
                                />
                            </div>
                            <button
                                onClick={() => handleUpload()}
                                className="px-5 py-1 text-lg bg-[#4B4DF7] text-white w-full font-bold rounded mb-2"
                            >
                                Upload
                            </button>
                        </div>
                    )}

                    <input
                        className="hidden"
                        onChange={handleFileChange}
                        ref={fileUploadInputRef}
                        type="file"
                    />

                    <div className="space-y-2 h-[65vh] overflow-y-scroll no-scrollbar">
                        {images?.map((image, index) => (
                            <div
                                key={image}
                                onClick={() => setCurrImageIndex(index)}
                                className={`w-full border-4 cursor-pointer ${
                                    index == currImageIndex
                                        ? "border-orange-500"
                                        : "border-transparent"
                                }`}
                            >
                                <img className="w-full" src={image} alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        width: window.innerWidth - xOffset,
                        height: window.innerHeight - yOffset,
                    }}
                    className="relative bg-white shadow rounded-3xl overflow-hidden"
                >
                    <img
                        className="absolute-center w-full"
                        src={images[currImageIndex]}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default PptControl;
