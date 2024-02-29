import React from "react";
import { Link } from "wouter";

const ClassCard = ({ name, code, teacherName }) => {
    return (
        <Link href={`class/${code}`}>
            <div className="w-full hover:shadow cursor-pointer">
                <div className="rounded-md border-2 w-full">
                    <div className="rounded-t-md py-6 px-4 bg-[url('https://storage.googleapis.com/kami-uploads-public/library-resource-mCuUVpQT23hD-7zuF9y-google-classroom-banner-blank-busy-bee-png')] bg-cover bg-bottom">
                        <p className="text-2xl capitalize text-white ">
                            {name}
                        </p>
                        <p className="text-gray-200 ">{teacherName}</p>
                    </div>
                    <div className="md:py-5 py-2 px-4 md:min-h-36">
                        <p className="text capitalize">
                            <strong>Code: </strong>
                            {code}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ClassCard;
