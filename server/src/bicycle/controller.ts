import { Request, Response } from 'express';
import {BicycleService} from './service';
import {CreateBicycleDto,UpdateStatusDto} from './dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { IBicycleService } from './type';

export class BicycleController {
    constructor(private bicycleService:IBicycleService<CreateBicycleDto,UpdateStatusDto>) {}

    public async create(req: Request, res: Response) {
        try {
            const createBicycleDto = plainToClass(CreateBicycleDto, req.body);
            const errors = await validate(createBicycleDto);
            if (errors.length > 0) {
                res.status(400).json(errors);
                return;
            }
            const bicycle = await this.bicycleService.create(createBicycleDto);
            res.status(201).json(bicycle);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getAll(req: Request, res: Response) {
            const bicycles = await this.bicycleService.getAll();
            res.json(bicycles);
    }

    public async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateStatusDto = plainToClass(UpdateStatusDto, req.body);
            const errors = await validate(updateStatusDto);
            if (errors.length > 0) {
                res.status(400).json(errors);
                return;
            }
            const updatedBicycle = await this.bicycleService.updateStatus(id, updateStatusDto);
            res.json(updatedBicycle);
        } catch (error) {
            res.status(500).json({ message: "Error updating bicycle" });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.bicycleService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting bicycle"});
        }
    }

    public async getStats(req: Request, res: Response) {
        try {
            const stats = await this.bicycleService.getStats();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ message: "" });
        }
    }
}

export const bicycleController = new BicycleController(new BicycleService());