import { Link } from "wouter";

const AuthLayout = ({ children, title }) => {
    return (
        <div className="bg-[#f8faff] min-h-screen w-screen grid place-items-center py-0 sm:py-10 bg-i1">
            <div className="bg-white rounded shadow p-10 sm:w-96 min-h-screen sm:min-h-fit">
                <div className="font-black font-jetbrains text-2xl mb-5 text-center">
                    {title}
                </div>

                <div className="mb-5 px-10">
                    <img src="vr-clasroom-vector.png" alt="" />
                    <div className="font-extrabold text-center text-xl font-jetbrains mt-2">
                        <span className="text-[#7D97F4] mr-2">VR</span>
                        <span className="text-[#4B4DF7]">Classroom</span>
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
