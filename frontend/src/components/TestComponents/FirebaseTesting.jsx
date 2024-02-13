import { useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../helper/firebase";

const FirebaseTesting = () => {
    useEffect(() => {
        onValue(
            ref(db, "vr-classroom/session/my-code/total-students"),
            async (snapshot) => {
                const data = snapshot.val();
                console.log(data);
            }
        );
    }, []);

    return <div>Hello</div>;
};

export default FirebaseTesting;
