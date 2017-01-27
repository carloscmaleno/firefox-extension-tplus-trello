#!/usr/bin/env sh

#Check parameters
if [ $# -eq 0 ]
then
    echo "You must set an option"
    echo "Options:"
    echo "  run     Build and run on firefox"
    echo "  build   Package to upload on addons manager"
    exit
fi

if [ $1 = 'run' ]
then
    ./node_modules/.bin/jpm run -b /usr/bin/firefox

elif [ $1 = 'build' ]
then
    ./node_modules/.bin/jpm xpi

else
    echo "Option not valid"
fi