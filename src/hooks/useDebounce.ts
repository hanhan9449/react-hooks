import {debounce, DebounceSettings} from "lodash-es";
import {useMemo, useRef} from "react";

const defaultDebounceSettings: DebounceSettings = {
    leading: true,
    trailing: false,
}
// eslint-disable-next-line no-unused-vars
type AnonymousFn = (...args: any[]) => any;

export function useDebounce<F extends AnonymousFn>(fn: F, ms: number, options = defaultDebounceSettings) {
    const fnRef = useRef(fn)
    fnRef.current = fn
    function dummyFn(...args: Parameters<F>) {
        return fnRef.current(...args) as ReturnType<F>

    }
    return useMemo(() => debounce(dummyFn, ms, options), [ms])
}
