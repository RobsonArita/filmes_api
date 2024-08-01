#!/bin/sh

# Execute as migrações
npx prisma migrate deploy

# Inicie o servidor com ts-node-dev
exec yarn dev
