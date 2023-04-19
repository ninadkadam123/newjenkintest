import { Router } from 'express'

export interface Routes {
    path?: string;
    routes: Router
}