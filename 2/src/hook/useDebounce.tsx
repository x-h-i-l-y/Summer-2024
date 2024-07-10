import { useCallback, useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300): (...args: Parameters<T>) => void {
    const timer = useRef<number | undefined>(undefined);

    return useCallback(
        (...args: Parameters<T>): void => {
            // 如果已经有定时器在运行，则清除它
            if (timer.current) {
                clearTimeout(timer.current);
            }

            // 设置新的定时器
            timer.current = setTimeout(() => {
                // 调用原始函数，确保 this 上下文正确（通常为 undefined 或 null）
                fn(args)
                // 清除定时器引用，防止内存泄漏
                timer.current = undefined;
            }, delay);
        },[]
    );
}