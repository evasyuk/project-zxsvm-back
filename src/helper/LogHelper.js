export default class Log {
    static printf = function () {
        if (process.env.MODE === 'DEV') {
            let string = ''
            Object.keys(arguments).forEach((key) => {
                string += `[${arguments[key]}]`
            })
            console.log(string)
        } else {

        }
    }
}

if (process.env.MODE !== 'DEV') {
    console.log('warning: printf disabled')
}

