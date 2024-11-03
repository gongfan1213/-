import type {Config} from '@jest/types';
const config :Config.InitialOptions = {
    transform: {
        "^.+\\.js$":"babel-jest",
        "^.+\\.ts$":"ts-jest",
        "^.+\\.vue$":"@vue/vue3-jest",
        ".+\\.(css|scss|png|jpg|svg)$":"jest-transform-stub"
    },
    moduleNameMapper: {
        "^@/(.*)$":"<rootDir>/src/$1"
    },
    testMatch: ["<rootDir>/src/**/*.spec.(t|j)s"],
    snapshotSerializers:["jest-serializer-vue"],
    testEnvironment:"jsdom",
    transformIgnorePatterns:["/node_modules/"]
}
export default config