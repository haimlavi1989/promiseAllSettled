# Promise.allSettled Task

The native `Promise.allSettled` function in JavaScript returns a promise that resolves after all the given promises have either been fulfilled or rejected, with an array of objects describing the outcome of each promise.

Your task is to implement a custom function named `promiseAllSettled` that behaves similarly to the native `Promise.allSettled`. This function should accept an iterable of promises, and return a promise that resolves with an array of result objects after all the given promises have either settled.

Each result object should contain a `status` string that can be `'fulfilled'` or `'rejected'`. 
For `'fulfilled'` promises, include a `value` property with the resolved value. For `'rejected'` promises, include a `reason` property with the rejection reason.
After implementing the `promiseAllSettled` function, use it to handle multiple promises and log the outcomes.


Function signature:
```
function promiseAllSettled(promises) {}
```

Expected output:
```
[
    { status: 'fulfilled', value: 100 },
    { status: 'fulfilled', value: "This Promise is fullfiled" },
    { status: 'rejected', reason: 'error' }
]
```

### Notes

1. Ensure that the function handles an empty array of promises and returns an immediately resolved promise with an empty array.
2. Consider edge cases, such as non-promise values in the iterable, and handle them appropriately.
3. Write clean, readable, and maintainable code.

### Bonus

Extend the previously implemented `promiseAllSettled` function to support a timing functionality. This means that if a promise has not settled by the time the specified timeout is reached, its result object should be updated to have the status `'timed_out'`.
The function should receive a numerical timeout value in milliseconds.

Function signature:
```
function promiseAllSettled(promises, timeout) {}
```

Expected output:
```
[
    { status: 'fulfilled', value: 100 },
    { status: 'timed_out' },
    { status: 'rejected', reason: 'error' }
]
```
