import { useEffect } from "react"


const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Hand Me Down`;
    }, [title])
}

export default useTitle;