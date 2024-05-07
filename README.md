<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[NestJS](https://github.com/nestjs/nest) Blog API for SoftTeco traineeship.

## Preparing Docker for Windows
### 1. Move docker drive to another drive
```bash
#check list of containers
wsl -l -v 

#turns off wsl
wsl --shutdown

#check if containers are running, both docker-desktop should be stopped
wsl -l -v 

#export data from docker-desktop-data to a tar archive
wsl --export docker-desktop-data d:\Docker\wsl\data\dockerdesktopdata.tar
# wsl --export <container-name> <path\archive.tar>

#remove docker-desktop-data
wsl --unregister docker-desktop-data

#check if there is only one 'docker-desktop' left
wsl -l -v

#import data from another drive
wsl --import docker-desktop-data d:\Docker\wsl\data d:\Docker\wsl\data\dockerdesktopdata.tar --version=2
# wsl --import <container-name> <path-where-should-be-new-disk-image> <path-to-our-archived-data\archive.tar> --version=<same-version-as-at-the-beginning>

#if you want to change default subsystem back to docker-desktop, it's not necessary
wsl -s docker-desktop

#final check
wsl -l
```
### 2. Move docker scout cache location to another drive
```bash
setx DOCKER_SCOUT_CACHE_DIR "D:\Docker\wsl\cache"
```
### 3. Restart PC

## Running the app

```bash
$ docker compose up --build
```