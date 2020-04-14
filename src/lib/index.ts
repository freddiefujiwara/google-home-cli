const Client = require('castv2-client').Client
export enum Command {
  GET_VOLUME, //0
  SET_VOLUME, //1
  MUTE, //2
  UNMUTE, //3
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
          client.getVolume((err: Error, volume: any) => {
            if (err === null) {
              console.log(Math.round(volume.level * 100))
            } else {
              console.error(err)
            }
            client.close()
          })
          break
        case Command.SET_VOLUME:
        case Command.MUTE:
        case Command.UNMUTE:
          client.getVolume((err: Error, volume: any) => {
            if (err === null) {
              if (command === Command.SET_VOLUME) {
                volume.level = (parseInt(arg) % 100) / 100
              } else {
                volume.level = command === Command.MUTE ? 0 : 0.3
              }
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
