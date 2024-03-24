export const getAxiosHeader = (isFile = false) => {
    const token = localStorage.getItem("vr_token");

    const headers = {
        "Content-Type": isFile ? "multipart/form-data" : "application/json",
        "x-auth-token": token,
    };

    return headers;
};
