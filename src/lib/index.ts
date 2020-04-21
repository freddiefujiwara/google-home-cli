const Client = require('castv2-client').Client
export enum Command {
  GET_VOLUME, //0
  SET_VOLUME, //1
  MUTE, //2
  UNMUTE, //3
  GET_STATUS, //4
  STOP, //5
  VOLUP, //6
  VOLDOWN, //6
}
/** Class GoogleHome */
export class GoogleHome {
  /** target host */
  private _host: string
  /**
   *
   * Create GoogleHome
   *
   **/
  constructor(host: string) {
    this._host = host
  }
  /**
   * open the lid
   *
   * @return void
   *
   **/
  async run(command: number, arg: string): Promise<any> {
    const client = new Client()
    client.connect(this._host, () => {
      console.error('Host:%s', this._host)
      switch (command) {
        case Command.GET_VOLUME:
        case Command.GET_STATUS:
        case Command.STOP:
          client.getStatus((err: Error, status: any) => {
            if (err === null) {
              switch (command) {
                case Command.GET_VOLUME:
                  console.log(Math.round(status.volume.level * 100))
                  client.close()
                  break
                case Command.GET_STATUS:
                  console.log(status)
                  client.close()
                  break
                case Command.STOP:
                  if (status && status.applications && status.applications.length > 0) {
                    client.receiver.stop(status.applications[0].sessionId, (err: Error) => {
                      if (err === null) {
                        console.log(`Stop %s`, status.applications[0].sessionId)
                      }
                      client.close()
                    })
                  } else {
                    client.close()
                  }
                  break
                default:
                  break
              }
            } else {
              console.error(err)
              client.close()
            }
          })
          break
        case Command.SET_VOLUME:
        case Command.MUTE:
        case Command.UNMUTE:
        case Command.VOLUP:
        case Command.VOLDOWN:
          client.getVolume((err: Error, volume: any) => {
            if (err === null) {
              if (command === Command.SET_VOLUME) {
                volume.level = parseInt(arg) / 100
              } else if (command === Command.VOLUP) {
                volume.level += 0.1
              } else if (command === Command.VOLDOWN) {
                volume.level -= 0.1
              } else {
                volume.level = command === Command.MUTE ? 0 : 0.3
              }
              volume.level = volume.level >= 1 ? 1 : volume.level
              volume.level = volume.level <= 0 ? 0 : volume.level
              console.log(`Set Volume %d%`, Math.round(volume.level * 100))
              client.setVolume(volume, (err: Error) => {
                if (err) {
                  console.error('Error:%s', err.message)
                }
              })
              client.close()
            } else {
              console.error(err)
              client.close()
            }
          })
          break
        default:
          client.close()
          break
      }
    })
    client.on('error', (err: Error) => {
      console.error('Error:%s', err.message)
      client.close()
    })
  }
}
