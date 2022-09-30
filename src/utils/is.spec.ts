import {isPromise} from "./is";

describe('isPromise testing suite', function () {
    test('promise work nice', () => {
        const promise = Promise.resolve()
        expect(isPromise(promise)).toBe(true)
    })

    test('primitive work nice', () => {
        const list = [
            0,
            true,
            undefined,
            null,
            Symbol(),
            '',
        ]
        for (const item of list) {
            expect(isPromise(item)).toBe(false)
        }
    })

    test('object work nice', () => {
        expect(isPromise({})).toBe(false)
    })
});
