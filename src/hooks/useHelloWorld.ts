import { useEffect } from "react";

export function useHelloWorld() {
    useEffect(() => {
        console.log('Hello World!!!')
    }, [])
}
