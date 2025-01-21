#!/bin/bash

# Check if the build directory exists
if [ ! -d "build" ]; then
    echo "Building the application..."
    npm run build
fi

# Start the server and open browser
node server.js & 

# Wait for server to start
sleep 2

# Open browser (works on macOS)
open http://localhost:3000

# Keep the script running
wait