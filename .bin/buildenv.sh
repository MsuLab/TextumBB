#!/bin/bash

function log {
	echo "---> $1"
}  

function cmd {
	echo "===> $1"
}

envName="textumEnv"

log "Building virtual enviroment..."

if [ ! -d ".$envName" ]; then
	log "Runing vertualenv command..."
	virtualenv --system-site-packages ../$envName
fi

log "Installing dependencies..."
../$envName/bin/pip install --upgrade distribute 
../$envName/bin/pip install --upgrade -r ./requirements.txt
