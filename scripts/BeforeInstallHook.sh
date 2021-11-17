#!/bin/bash
set -e
sudo apt install npm
sudo npm install -g npm@latest
sudo apt-get install -y nodejs
sudo apt-get install update -y
sudo npm install -g nginx
sudo npm install pm2 -g
sudo pm2 update
sudo apt install build-essential
