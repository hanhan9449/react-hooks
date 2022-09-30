import {geneLabel, trace} from "./trace";
import {wait} from "./wait";

describe('trace util testing suite', function () {
    const recordMap = new Map<string, number>()

    const originLog = console.log
    function mockLog(label: string, ms: number) {
        recordMap.set(label, ms)
    }

    beforeEach(() => {
        recordMap.clear()
        console.log = mockLog
    })
    afterEach(() => {
        console.log = originLog
    })
    test('normal function work nice', () => {
        const N = 200
        const M = 5

        function loop() {
            for (let i = 0; i < M; i++) {
                const now = Date.now()
                // eslint-disable-next-line no-empty
                while (Date.now() < now + N) {
                }
            }
            return true
        }

        const result = trace(loop)()
        expect(result).toBe(true)
        expect(recordMap.size).toBe(1)
        const [name, ms] = Array.from(recordMap.entries())[0]
        expect(name).toBe(geneLabel('loop'))
        expect(ms).toBeGreaterThanOrEqual(N * M - 1)
    })

    test('anonymous function work nice', () => {
        const N = 200
        const M = 5
        const loop = () => {
            for (let i = 0; i < M; i++) {
                const now = Date.now()
                // eslint-disable-next-line no-empty
                while (Date.now() < now + N) {
                }
            }
            return true
        }

        const result = trace(loop, 'anonymous function')()
        expect(result).toBe(true)
        expect(recordMap.size).toBe(1)
        const [name, ms] = Array.from(recordMap.entries())[0]
        expect(name).toBe(geneLabel('anonymous function'))
        expect(ms).toBeGreaterThanOrEqual(N * M - 1)
    })

    test('async function work nice', async () => {
        const N = 1000
        async function afn() {
            await wait(N)
            return true
        }

        const promiseResult = trace(afn)()
        expect(promiseResult).toBeInstanceOf(Promise)
        const result = await promiseResult
        expect(result).toBe(true)
        expect(recordMap.size).toBe(1)
        const [name, ms] = Array.from(recordMap.entries())[0]
        expect(name).toBe(geneLabel('afn'))
        expect(ms).toBeGreaterThanOrEqual(N - 1)

    })
});