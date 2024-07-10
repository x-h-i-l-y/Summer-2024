import { useCallback, useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300): (...args: Parameters<T>) => void {
    const timer = useRef<number | undefined>(undefined);

    return useCallback(
        (...args: Parameters<T>): void => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                fn(args)
                timer.current = undefined;
            }, delay);
        },[]
    );
}
