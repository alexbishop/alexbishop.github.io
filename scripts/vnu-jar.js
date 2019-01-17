#!/usr/bin/env node

/*!
 * Script to run vnu-jar if Java is available.
 * Copyright 2017-2018 The Bootstrap Authors
 * Copyright 2017-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

'use strict'

const childProcess = require('child_process')
const vnu = require('vnu-jar')

childProcess.exec('java -version', (error, stdout, stderr) => {

  if (error) {
    console.error('Skipping vnu-jar test; Java is missing.')
    return
  }

  const is32bitJava = !stderr.match(/64-Bit/)

  const args = [
    '-jar',
    vnu,
    '--asciiquotes',
    '--skip-non-html',
    '--Werror',
    '_site/'
  ]

  // For the 32-bit Java we need to pass `-Xss512k`
  if (is32bitJava) {
    args.splice(0, 0, '-Xss512k')
  }

  return childProcess.spawn('java', args, {
    shell: true,
    stdio: 'inherit'
  })
    .on('exit', process.exit)
})
