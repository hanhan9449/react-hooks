import {renderHook} from "@testing-library/react";
import {useHelloWorld} from "./useHelloWorld";

describe('useHelloWorld hook testing suite', function () {

    const originLog = console.log
    let st = []
    function mockLog(msg: string) {
        st.push(msg);
    }
    beforeEach(() => {
        st = []
        console.log = mockLog
    })
    afterEach(() => {
        console.log = originLog
    })

    it('should work nice', function () {
        renderHook(() => useHelloWorld())
        expect(st.length).toBe(1)
        expect(st[0]).toBe('Hello World!!!')
    });
});
