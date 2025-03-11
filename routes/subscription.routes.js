import { Router } from "express"; 

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req, res) => res.send({title: 'test'}) );

subscriptionRouter.get('/:id', );

subscriptionRouter.post('/',  (req, res) => res.send({title: 'test'}) );

subscriptionRouter.put('/id', );``

subscriptionRouter.delete('/', );

subscriptionRouter.get('/:id', );

subscriptionRouter.put('/:id/cancel', );

subscriptionRouter.get('/upcoming-renewals', );


export default subscriptionRouter;