export const getAxiosHeader = () => {
    const token = localStorage.getItem("vr_token");

    const headers = {
        "Content-Type": "application/json",
        "x-auth-token": token,
    };

    return headers;
};
