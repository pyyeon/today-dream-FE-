import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useReload = () => {
    const location = useLocation();
    const currentPath = useRef<string>("");

    useEffect(() => {
        if (currentPath.current === location.pathname) {
            window.location.reload();
        }

        currentPath.current = location.pathname;
    }, []);
};

export default useReload;
