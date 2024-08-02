#!/bin/sh

npx prisma migrate deploy
exec yarn de