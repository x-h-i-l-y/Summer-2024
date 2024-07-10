import { useEffect } from 'react';


export function useMount<T extends (...args: any[]) => any>(effect: T) {
    useEffect(effect, []);
}


export function useUnMount<T extends (...args: any[]) => any>(destroy: T) {
    useEffect(() => {
        return destroy
    }, []);
}
