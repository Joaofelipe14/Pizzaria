import {Router, Request, Response} from 'express';

const router = Router();

router.get('/teste',(red: Request, res: Response) =>{
   // return res.json({ok: true})
   throw new Error('aksjdçlasdasdas')
})


export { router };