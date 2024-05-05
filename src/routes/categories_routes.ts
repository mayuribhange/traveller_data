import { addCategories } from "../handler/addCategories/add_categories";
import { addServices } from "../handler/addServices/add_services";
import { deleteCategories } from "../handler/deleteCategories/delete_categories";
import { deleteServices } from "../handler/deleteServices/delete_services";
import { fetchCategories } from "../handler/fetchCategories/fetch_categories";
import { fetchServices } from "../handler/fetchServices/fetch_services";
import { updateCategories } from "../handler/updateCategories/update_categories";
import { updateServices } from "../handler/updateServices/update_services";

const express = require('express');

const ROUTER = express.Router();

ROUTER.post('/category', addCategories);
ROUTER.get('/categories', fetchCategories);
ROUTER.put('/category/:categoryId',updateCategories );
ROUTER.delete('/category/:categoryId', deleteCategories);
ROUTER.post('/category/:categoryId/service', addServices);
ROUTER.put('/category/:categoryId/service/:serviceId', updateServices);
ROUTER.get('/category/:categoryId/services',fetchServices);
ROUTER.delete('/category/:categoryId/service/:serviceId', deleteServices);
export default ROUTER;
