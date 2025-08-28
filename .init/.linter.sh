#!/bin/bash
cd /home/kavia/workspace/code-generation/secure-user-authentication-system-166262-166282/authentication_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

