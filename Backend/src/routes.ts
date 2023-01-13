import {Router} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import {isAuthenticated} from './milddlewares/isAuthenticated'

const router = Router();

// - Rota usuarios
router.post('/users',new CreateUserController().handle)
// - Login User
router.post('/session',new AuthUserController().handle)
// - earh itens user
router.get('/me',isAuthenticated,new DetailUserController().handle)


export { router };