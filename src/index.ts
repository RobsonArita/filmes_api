import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import http from 'http'
import { setupRoutes, setupServer } from './core/config/setup_config'

const app = express()
const server = http.createServer(app)

dotenv.config()

setupRoutes(app)
setupServer(server)
