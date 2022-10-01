# 常用react-hooks实现
[![test status][test-status-image]][test-status-url]
[![codecov](https://codecov.io/github/hanhan9449/react-hooks/branch/main/graph/badge.svg?token=r8VkjsvOm5)](https://codecov.io/github/hanhan9449/react-hooks)
[![npm version][npm-version]][package-url]
[![Downloads][downloads-image]][package-url]
[![license][license-image]][license-url]

## 特性
- typescript实现
- 覆盖完善单元测试用例
- 最佳实践

## 已经实现的

### utils

- [trace.ts](src/utils/trace.ts) 追踪函数、promise的运行时间
- [is.ts](src/utils/is.ts) 具有类型guard的判断函数

### hooks

- [useHelloWorld.ts](src/hooks/useHelloWorld.ts) 测试函数库工作正常
- [useLatestFn.ts](src/hooks/useLatestFn.ts) 即使在useMemo闭包中，也始终使用最新的fn
- [useDebounce.ts](src/hooks/useDebounce.ts) 小而美的debounce hook实现
- [useThrottle.ts](src/hooks/useThrottle.ts) 小而美的throttle hook实现





[test-status-image]: https://img.shields.io/github/workflow/status/hanhan9449/react-hooks/Node.js%20CI?label=test
[test-status-url]: https://github.com/hanhan9449/react-hooks/actions?query=branch%3Amain
[npm-version]: https://img.shields.io/npm/v/@hanhan9449/react-hooks
[package-url]: https://npmjs.org/package/@hanhan9449/react-hooks
[license-image]: https://img.shields.io/github/license/hanhan9449/react-hooks
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/@hanhan9449/react-hooks
