import {debounce, DebounceSettings} from "lodash-es";
import {useMemo, useRef} from "react";
import {AnyFn} from "../interfaces";
import {useLatestFn} from "./useLatestFn";

const debounceSettings: DebounceSettings = {
    leading: false,
    trailing: true,
}

/**
 * @publicApi
 * @param fn
 * @param ms
 */
export function useDebounce<F extends AnyFn>(fn: F, ms: number) {
    const latestFn = useLatestFn(fn)
    return useMemo(() => debounce(latestFn, ms, debounceSettings), [ms])
}
