import { useEffect } from "react";
import { useState } from "react";
import { BACKEND_URL } from "../../helper/staticVars";

const xOffset = 600;
const yOffset = 100;

const PptControl = ({ setCurrPptImgUrl }) => {
    const [currImageIndex, setCurrImageIndex] = useState(0);
    const [images, setImages] = useState([
        `${BACKEND_URL}/images/image_01.jpg`,
        `${BACKEND_URL}/images/image_02.jpg`,
        `${BACKEND_URL}/images/image_03.jpg`,
        `${BACKEND_URL}/images/image_04.jpg`,
        `${BACKEND_URL}/images/image_05.jpg`,
    ]);

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

    return (
        <div className="">
            <div className="grid place-items-center min-h-screen min-w-screen bg-vr-white bg-i1">
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2
                            bg-white min-h-[70vh] w-52 rounded-r-xl overflow-hidden p-2"
                >
                    <div className="border-2 border-dashed border-gray-500 font-semibold text-center px-5 py-2 cursor-pointer mb-2">
                        Upload Image
                    </div>
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
