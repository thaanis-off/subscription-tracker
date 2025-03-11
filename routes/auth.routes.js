import {Router} from 'express';

const authRouter = Router();

authRouter.get('sign-up',  (req, res) => res.send({title: 'Sign Up'}));

export default authRouter;