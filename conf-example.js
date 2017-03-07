const _ = require('lodash')
const moment = require('moment')
const ncp = require('copy-paste')
const os = require('os')

let conf = {
  repo: '/Users/xream/Project/Work/BlueOak/future-admin-vue',
  number: 65535,
  author: 'Hsiaoyi Hsu <xreamxu@gmail.com>',
  fields: ['subject', 'body', 'committerDateRel', 'committerDate'],
  all: true,
  nameStatus: false,

  week: true,
  parser: commits => {
    const report = _.chain(commits)
      .map(({ body }) => {
        return body.replace(/\[.*?\]|未来学校后台|\n/gi, '').split(/;|\.\s+?|；|。/)
      })
      .flatten()
      .map(i => '未来学校后台: ' + i)
      .join(os.EOL)
      .value()
    console.log(report)
    ncp.copy(report)
  },
}
if (conf.week) {
  const day = moment().day()
  _.assign(conf, {
    after: moment().subtract(day + 2, 'd').format('YYYY-MM-DD 15:00:00'),
    before: moment().add(5 - day, 'd').format('YYYY-MM-DD 15:00:00'),
    number: 65535,
  })
}
_.assign(conf, process.env)

module.exports = conf
