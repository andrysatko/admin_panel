
export interface IBicycleService<CreateBicycleDto,UpdateStatusDto> {
    create(createBicycleDto: CreateBicycleDto): Promise<any>;
    getAll(): Promise<any[]>;
    updateStatus(id: string, updateBicycleDto: UpdateStatusDto): Promise<any>;
    delete(id: string): Promise<void>;
    getStats(): Promise<{ total: number, available: number, booked: number, averagePrice: number }>;
}