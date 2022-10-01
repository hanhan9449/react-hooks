import { useEffect } from "react";

/**
 * @publicApi
 */
export function useHelloWorld() {
    useEffect(() => {
        console.log('Hello World!!!')
    }, [])
}
