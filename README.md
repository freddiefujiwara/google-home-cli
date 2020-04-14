# google-home-cli

Command line client for google home

## Requirements

- Node 7.6 or later

## Installation

```bash
npm i -g google-home-cli
```

## Usage

```bash
  Usage: google-home-cli <host> <command> [arg]



  Options:

    -V, --version     output the version number
    -h, --help        output usage information
```

## Example

```bash
$ google-home-cli 192.168.1.101 volume
host:192.168.1.101
20
$ google-home-cli 192.168.1.101 volume 30
host:192.168.1.101
Set Volume 30%
$ google-home-cli 192.168.1.101 mute
host:192.168.1.101
Set Volume 0%
$ google-home-cli 192.168.1.101 unmute
host:192.168.1.101
Set Volume 30%
```

## FAQ

[FAQ](https://github.com/freddiefujiwara/google-home-cli/wiki/FAQ)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/freddiefujiwara/google-home-cli
