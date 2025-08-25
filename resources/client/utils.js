export const waitFor = (predicate, timeout = 1000) => {
    return new Promise((resolve, reject) => {
        const start = Date.now()
        const interval = setInterval(() => {
            if (predicate()) {
                clearInterval(interval)
                resolve()
            } else if (Date.now() - start > timeout) {
                clearInterval(interval)
                reject(new Error('Timeout'))
            }
        }, 0)
    })
}

export const randomItem = (array) => array[Math.floor(Math.random() * array.length)]

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))