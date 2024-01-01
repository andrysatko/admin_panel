import express from "express";
import { bicycleController } from './controller';

const router = express.Router();
router.post('/bicycles', bicycleController.create.bind(bicycleController));
router.get('/bicycles', bicycleController.getAll.bind(bicycleController));
router.put('/bicycles/status/:id', bicycleController.updateStatus.bind(bicycleController));
router.delete('/bicycles/:id', bicycleController.delete.bind(bicycleController));
router.get('/bicycles/stats', bicycleController.getStats.bind(bicycleController));

export default router;