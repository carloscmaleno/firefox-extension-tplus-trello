#!/usr/bin/env sh

#Check parameters
if [ $# -eq 0 ]
then
    echo "You must set an option"
    echo "Options:"
    echo "  run     Build and run on firefox"
    echo "  build   Package to upload on addons manager"
    echo "  test    Launch tests"
    exit
fi

if [ $1 = 'run' ]
then
    ./node_modules/.bin/jpm run -b `/usr/bin/firefox http://trello.com/login`

elif [ $1 = 'build' ]
then
    ./node_modules/.bin/jpm xpi

elif [ $1 = 'test' ]
then
    ./node_modules/.bin/jpm test

else
    echo "Option not valid"
fi