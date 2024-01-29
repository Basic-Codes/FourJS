import { useEffect } from "react";
import { useState } from "react";

const xOffset = 600;
const yOffset = 100;

const PptControl = () => {
    const [currImageIndex, setCurrImageIndex] = useState(0);
    const [images, setImages] = useState([
        "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-443446.jpg&fm=jpg",
        "https://c4.wallpaperflare.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg",
        "https://t4.ftcdn.net/jpg/05/71/06/03/360_F_571060336_lRFo9ZoUUYDzcKb6dHKMs8unl2TM98rr.jpg",
        "https://wallpapers.com/images/hd/hd-white-tree-in-woods-2p5890rh2o8ho1tk.jpg",
        "https://c4.wallpaperflare.com/wallpaper/458/251/742/katherine-langford-pc-desktop-hd-wallpaper-preview.jpg",
    ]);

    useEffect(() => {
        document.onkeydown = (e) => {
            {
                e = e || window.event;

                if (e.keyCode == "37" || e.keyCode == "38") {
                    console.log(currImageIndex % images?.length);
                    setCurrImageIndex(
                        (currImageIndex) =>
                            (currImageIndex - 1) % images?.length
                    );
                } else if (e.keyCode == "40" || e.keyCode == "39") {
                    console.log("down arrow");
                    setCurrImageIndex(
                        (currImageIndex) =>
                            (currImageIndex + 1) % images?.length
                    );
                }
            }
        };
    }, []);

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
