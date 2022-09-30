import type {Config} from 'jest'

const config: Config = {
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageReporters: [
        "text",
        "cobertura"
    ]
}
export default config;
