describe('testing suite is working!!!', function () {

    test('true is truthy', () => {
        expect(true).toBe(true);
    })

    test('false is falsy', () => {
        expect(false).toBe(false);
    })

    test('typescript support', () => {
        function fn(n: number) {
            return String(n)
        }

        expect(fn(1)).toEqual('1')
    })
});
