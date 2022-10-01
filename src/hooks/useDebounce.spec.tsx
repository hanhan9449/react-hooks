import {useDebounce} from "./useDebounce";
import {act, render, renderHook} from "@testing-library/react";
import {FC, useState} from "react";
import {wait} from "../utils/wait";

describe('useDebounce hook testing suite', function () {
    test('debounce work nice', async () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        const component = render(<Test/>)
        const valueEl = await component.getByTestId('value')
        const buttonEl = await component.getByTestId('button')
        for (let i = 0; i < 5; i++) {
            buttonEl.click()
        }
        expect(valueEl.innerHTML).toBe('0')
        await wait(500)
        expect(valueEl.innerHTML).toBe('0')
        // `setTimeout`存在精度问题，在不影响结果的情况下多加100ms保证UT准确性
        await wait(600)
        expect(valueEl.innerHTML).toBe('1')
        for (let i = 0; i < 5; i++) {
            buttonEl.click()
        }
        // `setTimeout`存在精度问题，在不影响结果的情况下多加100ms保证UT准确性
        await wait(1100)
        expect(valueEl.innerHTML).toBe('2')
    })

});

const Test: FC = () => {
    const [value, setValue] = useState(0)
    function updateValue() {
        act(() => {
            setValue(p => p + 1)
        })
    }
    const debouncedUpdateValue = useDebounce(updateValue, 1000)
    return (
    <div>
        <span data-testid='value'>{value}</span>
        <button data-testid={'button'} onClick={debouncedUpdateValue}>button</button>
    </div>)
}
