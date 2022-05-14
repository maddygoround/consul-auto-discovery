#!/bin/bash
node app.js
sudo systemctl daemon-reload
sudo service consul stop
sudo service consul start