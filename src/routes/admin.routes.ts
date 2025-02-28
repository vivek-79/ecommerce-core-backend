import { Router } from "express";
import { addCategory, deleteCategory, listCategories, updateCategory } from "../controllers/category.controller";
import { addProduct, deleteProduct, listProducts, updateProduct } from "../controllers/product.controller";
import { adminLogin } from "../controllers/admin.login";
import adminAuthMiddleware from "../middleware/admin.auth";



const adminRoutes = Router();

adminRoutes.route('/login').post(adminLogin);

//middle-ware check for admin
adminRoutes.use(adminAuthMiddleware);

//category-routes
adminRoutes.route('/categories/add').post(addCategory);
adminRoutes.route('/categories/update').put(updateCategory);
adminRoutes.route('/categories/delete').delete(deleteCategory);
adminRoutes.route('/categories/list').get(listCategories);

//product-routes
adminRoutes.route('/products/add').post(addProduct);
adminRoutes.route('/products/update').put(updateProduct);
adminRoutes.route('/products/delete').delete(deleteProduct);
adminRoutes.route('/products/list').get(listProducts);

//sales-report
adminRoutes.route('/sales/category-wise').get(addProduct);
adminRoutes.route('/sales/top-products').put(updateProduct);
adminRoutes.route('/sales/worst-products').delete(deleteProduct);



export default adminRoutes;