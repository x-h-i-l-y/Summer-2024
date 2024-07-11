import { useEffect } from 'react';

export function useMount<T extends (...args: any[]) => any>(effect: T) {
    useEffect(effect, []);
}