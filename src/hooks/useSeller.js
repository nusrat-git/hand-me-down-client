import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/Context/AuthProvider";

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const {setLoading}= useContext(AuthContext); 
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsSeller(data.isSeller);
                    setLoading(false);
                })
        }
    }, [email]);

    return [isSeller];
}

export default useSeller; 