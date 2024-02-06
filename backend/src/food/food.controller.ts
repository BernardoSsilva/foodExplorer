import { UpdateFoodDto } from './dto/update.food.dto';
import { CreateFoodDto } from "./dto/create.food.dto";
import { FoodService } from "./food.service";

export class FoodController {
  constructor(private foodService: FoodService) {}

  async findAll() {
    return await this.foodService.findAllMenu();
  }

  async createNew(userId: string, createFoodDto: CreateFoodDto) {
    return await this.foodService.createFood(userId, createFoodDto);
  }

  async fileUpload(food: number, fileName: string, storedName: string){
    return await this.foodService.fileUpload(food, fileName, storedName)
  }

  async updateFood(id:number, updateFoodDto:UpdateFoodDto){
    return await this.foodService.updateFood(id, updateFoodDto)
  }

  async deleteFood(id:number){
    return await this.foodService.deleteFood(id)
  }
}
