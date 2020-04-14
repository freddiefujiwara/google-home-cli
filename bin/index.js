#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package')
const Command = require('../dist/lib/index.js').Command

let hostValue = undefined
let commandValue = Command.GET_VOLUME
let argValue = undefined

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('google-home-audioplay <host> <command>')
  .arguments('<host> <command> [arg]')
  .action(function(host, command, arg) {
    hostValue = host
    switch(command){
      case "volume" :
        if(arg){
          commandValue = Command.SET_VOLUME
          argValue = arg
        }
        break
      case "status" :
        commandValue = Command.GET_STATUS
        break
      case "mute" :
        commandValue = Command.MUTE
        break
      case "unmute" :
        commandValue = Command.UNMUTE
        break
      case "stop" :
        commandValue = Command.STOP
        break
      default:
        break
    }
  })
program.parse(process.argv)
if (typeof hostValue === 'undefined' || typeof commandValue === 'undefined') {
  console.error(program.usage())
  process.exit(1)
}

const GoogleHome = require('../dist/lib/index.js').GoogleHome
const ghs = new GoogleHome(hostValue)
ghs
  .run(commandValue,argValue)
  .then(function() {})
  .catch(function() {})
