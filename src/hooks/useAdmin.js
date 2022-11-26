import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/Context/AuthProvider";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {setLoading}= useContext(AuthContext);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsAdmin(data.isAdmin);
                    setLoading(false);
                })
        }
    }, [email]);

    return [isAdmin];
}

export default useAdmin; 