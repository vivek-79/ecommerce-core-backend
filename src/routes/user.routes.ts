import { Router } from "express";
import { login, orders, placeOrder, products, register } from "../controllers/user.controller";
import userAuthMiddleware from "../middleware/user.auth";



const userRoutes = Router();


userRoutes.route('/login').post(login);
userRoutes.route('/register').post(register);

//middleware-check for user
userRoutes.use(userAuthMiddleware)

userRoutes.route('/orders').get(orders);
userRoutes.route('/place-order').post(placeOrder);
userRoutes.route('/products').get(products);


export default userRoutes;