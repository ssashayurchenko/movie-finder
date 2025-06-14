#!/bin/sh

echo "Injecting environment variables into env.js..."

sed -i "s|%%VITE_API_URL%%|${VITE_API_URL}|g" /usr/share/nginx/html/env.js
sed -i "s|%%VITE_ACCESS_TOKEN%%|${VITE_ACCESS_TOKEN}|g" /usr/share/nginx/html/env.js

exec "$@"
