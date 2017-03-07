const _ = require('lodash')
const gitlog = require('gitlog')
const conf = require('./conf')

gitlog(conf, (err, commits) => {
  if (err) throw err
  conf.parser(commits)
})
