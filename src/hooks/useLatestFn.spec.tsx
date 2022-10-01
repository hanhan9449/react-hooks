import {act, render} from "@testing-library/react";
import {useLatestFn} from "./useLatestFn";
import React, {FC, useCallback, useEffect, useState} from "react";
import {wait} from "../utils/wait";

describe('useLatestFn hook testing suite', function () {
    test('useMemo hooks has closures',  async () => {
        const component = render(<TestUseMemo/>)
        const divEl = await component.getByTestId('value')
        expect(divEl.innerHTML).toBe('0')
        await wait(100)
        expect(divEl.innerHTML).toBe('1')
        await wait(100)
        expect(divEl.innerHTML).toBe('1')
        await wait(100)
        expect(divEl.innerHTML).toBe('1')
    })
    test('normal function work nice', async () => {
        const component = render(<TestUseLatestFn/>)
        const divEl = await component.getByTestId('value')
        expect(divEl.innerHTML).toBe('0')
        await wait(100)
        expect(divEl.innerHTML).toBe('1')
        await wait(100)
        expect(divEl.innerHTML).toBe('2')
        await wait(100)
        expect(divEl.innerHTML).toBe('3')
    })
});

const TestUseMemo: FC = () => {
    const [value, setValue] = useState(0)
    const updateValue = () => {
        setValue(value + 1)
    }
    const memoUpdateValue = useCallback(updateValue, [])
    useEffect(() => {
        (async () => {
            await wait(100)
            act(() => {
                memoUpdateValue()
            })
            await wait(100)
            act(() => {
                memoUpdateValue()
            })
            await wait(100)
            act(() => {
                memoUpdateValue()
            })
        })()
    }, [])

    return (
        <div data-testid='value'>{value}</div>
    )
}

const TestUseLatestFn: FC = () => {
    const [value, setValue] = useState(0)
    const updateValue = () => {
        setValue(value + 1)
    }
    const memoUpdateValue = useLatestFn(updateValue)
    useEffect(() => {
        (async () => {
            await wait(100)
            act(() => {
                memoUpdateValue()
            })
            await wait(100)
            act(() => {
                memoUpdateValue()
            })
            await wait(100)
            act(() => {
                memoUpdateValue()
            })
        })()
    }, [])

    return (
        <div data-testid='value'>{value}</div>
    )
}
