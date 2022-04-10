## Overview

This repo contains the sample code for the article: [Beyond REST: Using WebSockets for two-way communication in your React app](https://blog.logrocket.com/beyond-rest-using-websockets-for-two-way-communication-in-your-react-app-884eff6655f5)

It implements a WebSockets client-server system that lets two people play
connect4 against each other

This repository was forked from the [the-gigi/connect4](https://gitlab.com/the-gigi/connect4) original repository
with the following updates:

- All dependencies are up-to-date.
- Updated the `socket.io` server with v4.x APIs.
- Enable CORS for development purposes.

## License and Copyrights

MIT - Copyright (c) 2018 Gigi Sayfan

## Usage

`run dev`

This will run both the server and the client. It will also open one web browser on http://localhost:3000. This will the Red player. You need to open another tab (or browser) and go to http://localhost:3000 again. This will be the Yellow player and then the game can start with the players alternating turns until one wins.
