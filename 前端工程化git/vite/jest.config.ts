import type {Config} from '@jest/types';
const config :Config.InitialOptions = {
    transform: {
        //以什么什么结尾的以什么格式去测试
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
//sum.spec.ts
//it('sum two numbers),()=>{expoect(sum(1,2).toBe(3))}});
//test:jest 
//pnpm test 

