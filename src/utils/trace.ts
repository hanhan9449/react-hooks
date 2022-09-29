// eslint-disable-next-line no-unused-vars
type AnyFn = (...args: any[]) => any

/**
 * @internal
 * @param name
 */
export function geneLabel(name: string): string {
    return `traceTime[${name}]`
}

/**
 * @publicApi
 * @param fn
 * @param name
 */
export function trace<T extends AnyFn>(fn: T, name?: string): T {
    const label = geneLabel(name || fn.name)
    return function(...args: Parameters<T>) {
        console.time(label)
        const result = fn(...args) as ReturnType<T>
        // @ts-ignore if result is primitive return false, no error
        if (result instanceof Promise) {
            return result.then(result => {
                console.timeEnd(label)
                return result
            }).catch(err => {
                console.timeEnd(label)
                return err
            })
        } else {
            console.timeEnd(label)
            return result
        }
    }  as T
}
