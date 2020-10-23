const { spawn } = require('child_process')
const newman = require('newman')

const COLLECTION_PATH = './api.postman_collection.json'
const environment = require('./env/local.postman_environment.json')

let child, wasAliveBeforeStart

// returns true if request succeeded
// returns false if ECONNREFUSED
const _pingRequest = () => {
    const URL = environment.values.find((item) => item.key === 'URL_V1').value + '/ping?test=test'
    const exe = URL.startsWith('https://') ? require('https') : require('http')
    return new Promise((resolve, reject) => {
        console.log('>> ping message sent')
        const req = exe.get(URL, (resp) => {
            let data = ''

            resp.on('data', (chunk) => {
                data += chunk
            })

            resp.on('end', () => {
                // console.log(JSON.parse(data))
                console.log('>> pong message received!')
                resolve(true)
            })

        }).on("error", (err) => {
            console.log("Error: " + err.message)
            if (err.message.startsWith('connect ECONNREFUSED')) {
                resolve(false)
            } else {
                reject(err)
            }
        })

        setTimeout(() => {
            req.abort()
            reject()
        }, 10000)
    })
}

const checkLocalAlive = () => {
    return new Promise(async (resolve, reject) => {
        _pingRequest()
          .then((isLocalAlreadyAlive) => {
              resolve(isLocalAlreadyAlive)
          })
          .catch((err) => {
              reject(err)
          })
    })
}
const makeLocalAlive = () => {
    return spawn('npm', ['run', 'serve'])
}

const cleanupIfRequired = () => {
    child.stdin.pause()
    child.kill()
}

const getNow = () => {
    const today = new Date()
    let hh = today.getHours()
    let mm1 = today.getMinutes()
    let ss = today.getSeconds()

    let dd = today.getDate()
    let mm = today.getMonth() + 1

    let yyyy = today.getFullYear()
    const getNormalized = (val) => {
        if (val < 10) {
            return '0' + val
        }
        return val
    }
    dd = getNormalized(dd)
    mm = getNormalized(mm)
    hh = getNormalized(hh)
    mm1 = getNormalized(mm1)
    ss = getNormalized(ss)

    return hh + ':' + mm1 + ':' + ss + '_' + dd + '-' + mm + '-' + yyyy
}

checkLocalAlive()
  .then((wasAlive) => {
      wasAliveBeforeStart = wasAlive

      console.log('>> starting up local server...')
      child = makeLocalAlive()

      return new Promise((resolve) => {
          setTimeout(() => {
              console.log('>> going to the next step:')
              resolve()
          }, 10000)
      })
  })
  .then(() => {
      const date = new Date()
      const newManConfig = {
          collection: require(COLLECTION_PATH),
          delayRequest: 10, // ms
          reporters: ['cli', 'html'],
          reporter: {
              html: {
                  export: `./postman/report/report_${getNow()}.html`,
                  template: `./postman/templates/custom1.hbs`,
              },
          },
          environment,
      }
      const onFinish = (err) => {
          if (err) {
              throw Error(err)
          }
          console.log('>> collection run complete!')
          process.exit(0)
      }
      newman.run(newManConfig, onFinish)
  })
  .catch((err) => {
      console.log('error', err)
  })
  .finally(() => {
      if (!wasAliveBeforeStart) {
          cleanupIfRequired()
      }
      return new Promise((resolve) => {
          setTimeout(() => { resolve() }, 5000)
      })
  })
