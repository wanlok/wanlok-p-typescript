#!/bin/bash

url=$1
if [ -n "$url" ]; then
  npm run build
  npm run start -- "$url"  
fi
