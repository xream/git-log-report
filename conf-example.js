const _ = require('lodash')
const moment = require('moment')
const os = require('os')

const myConfig = {
  data: [
    {
      repo: '/Users/Rain/Projects/future-web',
      author: 'rainkolwa <pluvo.lee@gmail.com>',
      project: '未来学校'
    },
    {
      repo: '/Users/Rain/Projects/future-admin-vue',
      author: 'rainkolwa <pluvo.lee@gmail.com>',
      project: '未来学校后台'
    }
  ]
}

const configure = (c) => {
  let conf = {
    repo: c.repo,
    number: 65535,
    author: c.author,
    fields: ['subject', 'body', 'committerDateRel', 'committerDate'],
    all: true,
    nameStatus: false,

    week: true,
    parser: commits => {
      const report = _.chain(commits)
        .reverse()
        .map(({ body }) => {
          let rule = "\\[.*?\\]|" + c.project + "|\\n"
          let reg = new RegExp(rule, 'gi')
          return body.replace(reg, '').split(/;|\.\s+?|；|。/)
        })
        .flatten()
        .map(_.trim)
        .filter(i=>i.length > 0 && !i.match(/merge|^(test|测试)$/img))
        .map(i => c.project+ ': ' + i)
        .join(os.EOL)
        .value()
      return report
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
  return conf
}

const configs = myConfig.data.map(config => {
  return configure(config)
})

module.exports = configs
