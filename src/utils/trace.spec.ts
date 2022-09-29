import {geneLabel, trace} from "./trace";
import {wait} from "./wait";

describe('trace util testing suite', function () {
    const recordMap = new Map<string, [number, number]>()

    function mockTime(label: string) {
        const tuple = recordMap.get(label) ?? [] as any
        tuple[0] = Date.now()
        recordMap.set(label, tuple)
    }

    function mockTimeEnd(label: string) {
        const tuple = recordMap.get(label) ?? [] as any
        tuple[1] = Date.now()
        recordMap.set(label, tuple)
    }

    const originTime = console.time
    const originTimeEnd = console.timeEnd
    beforeEach(() => {
        recordMap.clear()
        console.time = mockTime
        console.timeEnd = mockTimeEnd
    })
    afterEach(() => {
        console.time = originTime
        console.timeEnd = originTimeEnd

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
        const tuple = Array.from(recordMap.values())[0]
        const name = Array.from(recordMap.keys())[0]
        expect(name).toBe(geneLabel('loop'))
        expect(tuple[1] - tuple[0]).toBeGreaterThanOrEqual(N * M)
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
        const tuple = Array.from(recordMap.values())[0]
        const name = Array.from(recordMap.keys())[0]
        expect(name).toBe(geneLabel('anonymous function'))
        expect(tuple[1] - tuple[0]).toBeGreaterThanOrEqual(N * M)
    })

    test('async function work nice', async () => {
        async function afn() {
            await wait(1000)
            return true
        }

        const promiseResult = trace(afn)()
        expect(promiseResult).toBeInstanceOf(Promise)
        const result = await promiseResult
        expect(result).toBe(true)
        expect(recordMap.size).toBe(1)
        const tuple = Array.from(recordMap.values())[0]
        const name = Array.from(recordMap.keys())[0]
        expect(name).toBe(geneLabel('afn'))
        expect(tuple[1] - tuple[0]).toBeGreaterThanOrEqual(1000)

    })
});
