import { useEffect } from "react";

export function useUnMount<T extends (...args: any[]) => any>(destroy: T) {
    useEffect(() => {
        return destroy
    }, []);
}
