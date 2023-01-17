import {Router} from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCaretoryController'

import { CreateProductController } from './controllers/product/CreateProductController';

import {isAuthenticated} from './milddlewares/isAuthenticated'

import uploadConfig from './config/multer';

const upload = multer(uploadConfig.upload("./temp"))

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

//-- ROTAS PRODUCT
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle )


export { router };