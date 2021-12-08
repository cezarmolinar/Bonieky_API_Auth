import { Router } from 'express';
import multer from 'multer';

import * as ApiController from '../controllers/apiController';
import * as UserController from '../controllers/usersController';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));
    },
    limits: { fieldSize: 2000000 }
});


const router = Router();

router.get('/ping', ApiController.ping);

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/list', UserController.list);

router.post('/frase', ApiController.createPhrase);
router.get('/frase', ApiController.listPhrases);
router.get('/frase/:id', ApiController.getPhrase);
router.put('/frase/:id', ApiController.updatePhrase);
router.delete('/frase/:id', ApiController.deletePhrase);

router.post('upload', upload.single('arquivo'), ApiController.uploadFile);


export default router;