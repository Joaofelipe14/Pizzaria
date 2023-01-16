import {Router} from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCaretoryController'

import {isAuthenticated} from './milddlewares/isAuthenticated'


const router = Router();

// - Rota usuarios
router.post('/users',new CreateUserController().handle)
// - Login User
router.post('/session',new AuthUserController().handle)
// - searh itens user
router.get('/me',isAuthenticated,new DetailUserController().handle)

//-- ROTAS CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
router.get('/category', isAuthenticated, new ListCategoryController().handle )



export { router };