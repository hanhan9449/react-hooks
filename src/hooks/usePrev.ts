import {useEffect, useRef} from "react";

/**
 * @publicApi
 * @param value
 */
export function usePrev<T extends any>(value: T): T {
    const prevRef = useRef(null)
    useEffect(() => {
        prevRef.current = value
    }, [value])
    return prevRef.current
}
