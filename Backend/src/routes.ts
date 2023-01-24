import {Router} from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCaretoryController'

import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'

import {CreateoOrderController} from './controllers/order/CreateOrderController'
import {RemoverOrderController} from './controllers/order/RemoveOrderController'
import {AdditemController} from './controllers/order/AdditemController'
import {RemoverItenController} from './controllers/order/RemoverItenController'
import {SendOrderController} from './controllers/order/SendOrderController'

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
router.get ('/category/product', isAuthenticated, new ListByCategoryController().handle)

//-- ROTAS  ORDER
router.post('/order', isAuthenticated, new CreateoOrderController().handle )
router.delete('/order',isAuthenticated, new RemoverOrderController().handle )

router.post('/order/add',isAuthenticated, new AdditemController().handle)
router.delete('/order/remove',isAuthenticated, new RemoverItenController().handle)

router.put('/order/send',isAuthenticated, new SendOrderController().handle)


export { router };