import express, { Request, Response } from 'express'
import http from 'http'
import { setupRoutes, setupServer } from './core/config/setup_config'

const app = express()
const server = http.createServer(app)


setupRoutes(app)
setupServer(server)
