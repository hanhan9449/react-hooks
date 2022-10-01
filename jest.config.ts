import type {Config} from 'jest'

const config: Config = {
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageReporters: [
        "text",
        "cobertura"
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!lodash-es)'
    ]
}
export default config;
