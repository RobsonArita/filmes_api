import express, { Request, Response } from 'express'
import http from 'http'
import { setupProcedures, setupRoutes, setupRoutines, setupServer } from './core/config/setup_config'
import settings from './core/settings'

const app = express()
const server = http.createServer(app)


setupRoutes(app)
setupServer(server)

setupProcedures(settings.RUN_PROCEDURES)

setupRoutines(settings.RUN_ROUTINES)