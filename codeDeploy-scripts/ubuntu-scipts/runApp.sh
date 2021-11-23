#! /bin/bash
cp /var/www/note/note.service /etc/systemd/system
##add exceutable permissions to express app
sudo chmod +x /var/www/note/server.js
##Allows any users to write the app folder. Useful if using fs within the app
sudo chmod go+w /var/www/note
##Launches the express app
sudo systemctl daemon-reload
sudo systemctl start note
sudo systemctl enable note
