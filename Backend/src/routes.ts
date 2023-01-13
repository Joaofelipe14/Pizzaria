import {Router} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'


const router = Router();

// - Rota usuarios
router.post('/users',(new CreateUserController().handle))
// - Login User
router.post('/session',(new AuthUserController().handle))


export { router };