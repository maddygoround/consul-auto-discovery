#!/bin/bash
nohup /home/ubuntu/node_exporter/node_exporter &
node /home/ubuntu/nodeupdater/app.js
sudo systemctl daemon-reload
sudo service consul stop
sudo service consul start