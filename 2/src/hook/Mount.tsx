import { useEffect } from 'react';


function useMount<T extends (...args: any[]) => any>(effect: T) {
    useEffect(effect, []);
}


function useUnMount<T extends (...args: any[]) => any>(destroy: T) {
    useEffect(() => {
        return destroy
    }, []);
}