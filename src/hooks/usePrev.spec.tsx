import {act, render} from "@testing-library/react";
import React, {useEffect, useState} from "react";
import {usePrev} from "./usePrev";
import {wait} from "../utils/wait";

describe('usePrev hook testing suite', function () {

    test('usePrev work nice', async () => {
        function Test() {
            const [value, setValue] = useState(0)
            const prevValue = usePrev(value)
            useEffect(() => {
                (async () => {
                    await wait(100)
                    act(() => {
                        setValue(p => p + 1)
                    })
                })()
            }, [])
            return (<div>
                <div data-testid={'value'}>{JSON.stringify(value)}</div>
                <div data-testid={'prev-value'}>{JSON.stringify(prevValue)}</div>
            </div>)
        }
        const component = render(<Test/>)
        const value1 = component.getByTestId('value').innerHTML
        const prevValue1 = component.getByTestId('prev-value').innerHTML
        expect(value1).toBe('0')
        expect(prevValue1).toBe('null')
        await wait(100)
        const value2 = component.getByTestId('value').innerHTML
        const prevValue2 = component.getByTestId('prev-value').innerHTML
        expect(value2).toBe('1')
        expect(prevValue2).toBe('0')
        await wait(100)
        const value3 = component.getByTestId('value').innerHTML
        const prevValue3 = component.getByTestId('prev-value').innerHTML
        expect(value3).toBe('1')
        expect(prevValue3).toBe('0')
    })
});
