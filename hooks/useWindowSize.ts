import { useLayoutEffect, useState } from "react";

export default function useWindowSize(callback = null) {

    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
            if (callback && typeof callback === 'function') {
                callback.call();
            }
        }
        
        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
