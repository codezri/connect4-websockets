# Overview

This repo contains the sample code for the article: [Beyond REST: Using WebSockets for two-way communication in your React app](https://blog.logrocket.com/beyond-rest-using-websockets-for-two-way-communication-in-your-react-app-884eff6655f5)

It implements a WebSockets client-server system that lets two people play
connect4 against each other

# Usage

`run dev`

This will run both the server and the client. It will also open one web browser on http://localhost:3000. This will the Red player. You need to open another tab (or browser) and go to http://localhost:3000 again. This will be the Yellow player and then the game can start with the players alternating turns until one wins. 