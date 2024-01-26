const SignUp = () => {
    return (
        <div className="relative bg-[#f8faff] min-h-screen w-screen h-fit">
            <div className="absolute-center bg-white rounded shadow p-10 w-96 h-screen sm:h-auto">
                <div className="font-black font-jetbrains text-2xl mb-5 text-center">
                    Sign Up
                </div>

                <div className="mb-5 px-10">
                    <img src="vr-clasroom-vector.png" alt="" />
                    <div className="font-extrabold text-center text-xl font-jetbrains mt-2">
                        <span className="text-[#7D97F4] mr-2">VR</span>
                        <span className="text-[#4B4DF7]">Classroom</span>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="font-bold mb-2">Email</div>
                    <input
                        type="text"
                        className="px-3 py-1 text-lg outline-none border border-gray-400 rounded w-full placeholder:text-sm"
                        placeholder="Enter email.."
                    />
                </div>
                <div className="">
                    <div className="font-bold mb-2">Password</div>
                    <input
                        type="text"
                        className="px-3 py-1 text-lg outline-none border border-gray-400 rounded w-full placeholder:text-sm"
                        placeholder="Enter password.."
                    />
                </div>

                <a href="/signup" className="mt-3 block text-xs">
                    <span className="mr-1">Already have an accound?</span>
                    <span className="font-semibold text-[#4B4DF7] cursor-pointer ">
                        Signin
                    </span>
                </a>

                <div className="w-full text-center mt-10">
                    <button className="px-5 py-1 text-lg bg-[#4B4DF7] text-white font-bold rounded">
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
