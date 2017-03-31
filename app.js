const _ = require('lodash')
const gitlog = require('gitlog')
const ncp = require('copy-paste')
const conf = require('./future-web')

const tasks = conf.map(function(config) {
  return new Promise((resolve, reject) => {
    gitlog(config, (err, commits) => {
      if (err) throw err
      resolve(config.parser(commits)+ '\n')
    })
  })
})

Promise.all(tasks).then(function(arrResult) {
  let r = arrResult.toString().replace(/,/g, '')
  console.log(r)
  ncp.copy(r)
})
