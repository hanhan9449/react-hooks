import {AnyFn} from "../interfaces";
import {throttle, ThrottleSettings} from "lodash-es";
import {useMemo, useRef} from "react";
import {useLatestFn} from "./useLatestFn";
const throttleSettings: ThrottleSettings = {
    leading: true,
    trailing: false,
}

/**
 * @publicApi
 * @param fn
 * @param ms
 */
export function useThrottle<F extends AnyFn>(fn: F, ms: number) {
    const latestFn = useLatestFn(fn)
    return useMemo(() => throttle(latestFn, ms, throttleSettings), [ms])
}
