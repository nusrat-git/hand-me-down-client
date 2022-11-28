import { useEffect, useState } from "react";

const useVerify = email => {
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifiedLoading, setIsVerifiedLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://hand-me-down-server.vercel.app/users/seller/verified/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsVerified(data.isVerified);
                    setIsVerifiedLoading(false);
                })
        }
    }, [email]);

    return [isVerified, isVerifiedLoading];
}

export default useVerify;