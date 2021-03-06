import { createBatchResolver, ResolverFunction } from "graphql-resolve-batch";

interface SomeTestSource {
    someSourceProp: string;
}

interface SomeTestArgs {
    someArg: string;
}

interface SomeTestContext {
    someContextProp: string;
}

interface SomeTestResult {
    someTestResultProp: string;
}

const withSourceAndResultTyped = createBatchResolver<
    SomeTestSource,
    SomeTestResult
>((sources, _, __) => {
    return sources.map(source => {
        const res: SomeTestResult = {
            someTestResultProp: ""
        };

        return res;
    });
});

const withSourceAndResultTypedAsPromise = createBatchResolver<
    SomeTestSource,
    SomeTestResult
>((sources, _, __) => {
    // $ExpectType ReadonlyArray<SomeTestSource>
    const verifySources = sources;

    return sources.map(source => {
        return new Promise<SomeTestResult>(resolve => {
            const res: SomeTestResult = {
                someTestResultProp: ""
            };

            resolve(res);
        });
    });
});

const withSourceAndArgsAndResultTyped = createBatchResolver<
    SomeTestSource,
    SomeTestResult,
    SomeTestArgs
>((sources, args, _) => {
    // $ExpectType ReadonlyArray<SomeTestSource>
    const verifySources = sources;
    // $ExpectType string
    const verifyArgs = args.someArg;

    return sources.map(source => {
        return new Promise<SomeTestResult>(resolve => {
            const res: SomeTestResult = {
                someTestResultProp: ""
            };

            resolve(res);
        });
    });
});

const withSourceAndArgsAndContextTyped = createBatchResolver<
    SomeTestSource,
    SomeTestResult,
    SomeTestArgs,
    SomeTestContext
>((sources, args, context) => {
    // $ExpectType ReadonlyArray<SomeTestSource>
    const verifySources = sources;
    // $ExpectType string
    const verifyArgs = args.someArg;
    // $ExpectType string
    const verifyContext = context.someContextProp;

    return sources.map(source => {
        return new Promise<SomeTestResult>(resolve => {
            const res: SomeTestResult = {
                someTestResultProp: ""
            };

            resolve(res);
        });
    });
});
