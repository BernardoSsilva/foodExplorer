import { prisma } from "../../prisma/client";
import { CreateFoodDto } from "./dto/create.food.dto";

export class FoodService {
  async findAllMenu() {
    try {
      return prisma.food.findMany();
    } catch (err) {
      return false;
    }
  }

  async createFood(userId: string, foodObject: CreateFoodDto) {
    try {
      const result = await prisma.food.create({
        data: {
          authorId: userId,
          foodName: foodObject.foodName,
          foodIngredients: foodObject.foodIngredients,
          foodDescription: foodObject.foodDescription,
          foodPrice: foodObject.foodPrice,
        },
      });
      return JSON.stringify(result);
    } catch (err) {
      return false;
    }
  }

  async fileUpload(food: number, fileName: string, storedName: string) {
    try {
      const result = await prisma.image.create({
        data: {
          foodIdImage:food,
          fileName,
          storedName,
        },
      });

       if (!result) {
        return false;
      }
      return JSON.stringify(result)
    } catch (err) {
      return false;
    }
  }
}
