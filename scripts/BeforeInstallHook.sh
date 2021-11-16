#!/bin/bash
set -e
sudo apt-get install update -y
sudo npm install pm2 -g
sudo pm2 update
