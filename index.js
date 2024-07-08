// Your implementation here
const promiseAllSettled = (promises) => {
    const results = [];
    let settledCount = 0;

    if (!promises || !Array.isArray(promises) || typeof promises[Symbol.iterator] !== 'function') {
        return Promise.reject(new TypeError('Input is not iterable'));
    }

    return new Promise( (resolve) => {

        if (promises.length === 0) {
            resolve(results);
            return;
        }

        const handlePromiseResult = (index, status, value) => {
            results[index] = status === 'fulfilled' ? { status, value } : { status, reason: value };
            settledCount++;
            if (settledCount === promises.length) {
                resolve(results);
            }
        };
  
        promises.forEach((promise, index) => {
            Promise.resolve(promise)
            .then((value) => handlePromiseResult(index, 'fulfilled', value))
            .catch((reason) => handlePromiseResult(index, 'rejected', reason));
        });

    });
} 

// Usage:
const promises = [
    Promise.resolve(100),
    Promise.resolve("This Promise is fullfiled"),
    Promise.reject('error')
  ];
  
  promiseAllSettled(promises).then(console.log);
  // Expected output:
  // [
  //     { status: 'fulfilled', value: 100 },
  //     { status: 'fulfilled', value: "This Promise is fullfiled" },
  //     { status: 'rejected', reason: 'error' }
  // ]



// ************************************
// Bonus: Adding Timeout Functionality
// ************************************

 function promiseAllSettledBonus(promises, timeout) {
    const results = [];
    let settledCount = 0;

    if (!promises || !Array.isArray(promises) || typeof promises[Symbol.iterator] !== 'function') {
      return Promise.reject(new TypeError('Input is not iterable'));
    }
  
    return new Promise((resolve) => {

        if (promises.length === 0) {
            resolve(results);
            return;
        }

        const handlePromiseResult = (index, status, value) => {
            results[index] = status === 'fulfilled' ? { status, value } : { status, reason: value };
            settledCount++;
            if (settledCount === promises.length) {
                resolve(results);
            }
        };
  
        promises.forEach((promise, index) => {

            const timeoutPromise = new Promise( (_, reject) =>
                setTimeout(() => reject(new Error('timed_out')), timeout)
            );
    
            Promise.race( [Promise.resolve(promise), timeoutPromise])
            .then((value) => handlePromiseResult(index, 'fulfilled', value))
            .catch((reason) => {
                if (reason.message === 'timed_out') {
                    handlePromiseResult(index, 'timed_out', reason.message);
                } else {
                    handlePromiseResult(index, 'rejected', reason);
                }
            });
        });
    });
  }
  
  // Example usage:
  const promisesWithTimeout = [
    new Promise((resolve) => setTimeout(() => resolve(100), 1000)),
    new Promise((resolve) => setTimeout(() => resolve("This Promise is fullfiled"), 500)),
    new Promise((_, reject) => setTimeout(() => reject('error'), 300))
  ];
  
  promiseAllSettledBonus(promisesWithTimeout, 600).then(console.log);
  // Expected output with timeout of 600 ms:
  // [
  //     { status: 'timed_out', reason: 'timed_out' },
  //     { status: 'fulfilled', value: "This Promise is fullfiled" },
  //     { status: 'rejected', reason: 'error' }
  // ]
  
