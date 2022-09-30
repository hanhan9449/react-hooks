export function isPromise(item: any): item is Promise<any> {
    return item instanceof Promise
}
