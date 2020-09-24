#!/bin/sh

cd scripts
cd ../

while read line; do export "$line";
done < .env

echo "set.env.info.dev.sh finished"
#echo $JWT_TTL
echo ""