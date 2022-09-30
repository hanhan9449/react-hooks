import {wait} from "./wait";

describe('wait util testing suite', function () {
    test('wait 1000ms', async () => {
        const N = 1000
        const start = performance.now()
        await wait(N)
        expect(performance.now() - start).toBeGreaterThanOrEqual(N - 1)
    })
});
