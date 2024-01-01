import { PrismaClient} from '@prisma/client';
import { CreateBicycleDto, UpdateStatusDto } from './dto';
import { ObjectId } from 'mongodb';
export class BicycleService{
    private prisma:PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(bicycle: CreateBicycleDto) {
        const objectId = new ObjectId(bicycle.id).toString();
        return this.prisma.bicycle.create({data:{...bicycle,id:objectId}})
    }
    async getAll() {
        return this.prisma.bicycle.findMany();
    }
    async updateStatus(id:string, statusBody:UpdateStatusDto) {
        return this.prisma.bicycle.update({where:{id},data:{status:statusBody.status}});
    }
    async delete(id:string){
        await this.prisma.bicycle.delete({where:{id}});
    }
    async getStats():Promise<{total:number,available:number,booked:number,averagePrice:number}> {
        const total = await this.prisma.bicycle.count();
        const available = await this.prisma.bicycle.count({ where: { status: 'available' } });
        const booked = await this.prisma.bicycle.count({ where: { status: 'busy' } });
        const averagePrice = await this.prisma.bicycle.aggregate({ _avg: { price: true } });
        return {
            total,
            available,
            booked,
            averagePrice: averagePrice._avg.price ?parseFloat(averagePrice._avg.price.toFixed(2)) : 0.00,
          };
    }
}