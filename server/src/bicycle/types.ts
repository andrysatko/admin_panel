export interface BicycleService {
    create(createBicycleDto: CreateBicycleDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateBicycleDto: UpdateStatusDto): Promise<any>;
    remove(id: number): Promise<void>;
    getStats(): Promise<{ total: number, available: number, booked: number, averagePrice: number }>;
}