#!/bin/bash
cd /home/container

# Output Current Java Version
node -version ## only really needed to show what version is being used. Should be changed for different applications


DOWNLOAD_URL="wget https://github.com/forcehosting/X-Panel-free/releases/download/latest/cav3.tar.gz && tar -xzvf cav3.tar.gz"

INSTALL="npm install --legacy-peer-deps"
START="npm run start"
# Replace Startup Variables
MODIFIED_STARTUP=`eval echo $(echo ${INSTALL} && ${START} | sed -e 's/{{/${/g' -e 's/}}/}/g')`
echo ":/home/container$ ${MODIFIED_STARTUP}"

# Run the Server
${MODIFIED_STARTUP}