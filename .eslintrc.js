module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "jest"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier"
    ],
    env: {
        "jest/globals": true,
        browser: true
    },
    settings: {
        react: {
            version: "detect"
        }
    }
}
