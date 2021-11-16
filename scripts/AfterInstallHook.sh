#!/bin/bash
set -e
cd /usr/share/nginx/html
sudo npm install
sudo npm run build
