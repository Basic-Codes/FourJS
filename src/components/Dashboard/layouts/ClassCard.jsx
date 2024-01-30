import React from "react";

const ClassCard = () => {
    return (
        <div className="w-full">
            <div className="  rounded-md border-2 w-full">
                <div className="rounded-t-md py-6 px-4 bg-[url('https://www.gstatic.com/classroom/themes/img_code.jpg')] bg-cover">
                    <p className="text-2xl capitalize text-white ">
                        test class
                    </p>
                    <p className="text-gray-200 ">Section 3</p>
                </div>
                <div className="md:py-5 py-2 px-4">
                    <p className="text capitalize">assignment stuff</p>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
