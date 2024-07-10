import { useCallback, useRef } from 'react';

function useThrottle<T extends (...args: any[]) => any>(fn: T, interval: number): ((...args: Parameters<T>) => void) {
    const lastCallTime = useRef<number>(0);
    const timer = useRef<number | null>(null);
    const _self = useRef<T>(fn);
    return useCallback(
        (...args: Parameters<T>): void => {
            const now: number = Date.now();
            const durationTime: number = now - lastCallTime.current;
            if (durationTime >= interval) {
                if (timer.current !== null) {
                    clearTimeout(timer.current);
                }
                _self.current.apply(fn, args)
                lastCallTime.current = now;
            } else if (timer.current === null) {
                timer.current = setTimeout(() => {
                    if (timer.current !== null) {
                        _self.current.apply(fn, args)
                        lastCallTime.current = Date.now();
                        timer.current = null;
                    }
                }, interval - durationTime);
            }
        }, []);
}

export default useThrottle