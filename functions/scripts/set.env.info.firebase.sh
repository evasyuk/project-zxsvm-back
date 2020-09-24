#!/bin/sh

cd scripts
cd ../

while read line; do
  firebase functions:config:set "$line";
done < .env

echo "set.env.info.firebase.sh finished"
  firebase functions:config:get
echo ""