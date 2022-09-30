import {isPromise} from './is'
// eslint-disable-next-line no-unused-vars
type AnyFn = (...args: any[]) => any

/**
 * @internal
 * @param name
 */
export function geneLabel(name: string): string {
    return `traceTime[${name}]`
}

// eslint-disable-next-line no-unused-vars
export function trace<T extends Promise<any>>(promise: T, name?: string): T;
// eslint-disable-next-line no-redeclare,no-unused-vars
export function trace<T extends AnyFn>(fn: T, name?: string): T;
/**
 * 用于追踪function、async function、Promise运行时间
 *
 * @publicApi
 * @param fn
 * @param name
 */
// eslint-disable-next-line no-redeclare
export function trace<T extends AnyFn | Promise<any>>(fn: T, name?: string): T {
    if (isPromise(fn)) {
        const start = performance.now()
        const label = geneLabel(name)
        return fn.then(result => {
            console.log(label, performance.now() - start)
            return result
        }).catch(err => {
            console.log(label, performance.now() - start)
            return err
        }) as T

    }
    const label = geneLabel(name || fn?.name)
    return function(...args) {
        const start = performance.now()
        const result = fn(...args)
        if (isPromise(result)) {
            return result.then(result => {
                console.log(label, performance.now() - start)
                return result
            }).catch(err => {
                console.log(label, performance.now() - start)
                return err
            })
        } else {
            console.log(label, performance.now() - start)
            return result
        }
    }  as T
}
