import { prisma } from "../../prisma/client";
import { CreateFoodDto } from "./dto/create.food.dto";
import { UpdateFoodDto } from "./dto/update.food.dto";
import { Image } from "./entities/image.entity";
import fs from "fs";

export class FoodService {
  async findAllMenu() {
    try {
      const results = await prisma.food.findMany({
        include: {
          image: {
            select: {
              storedName: true,
              fileName: true,
            },
          },
        },
      });

      const b64ImagesResult = results.map((result) => {
        const { image } = result;
        if (image) {
          let imageB64 = this.toB64(image);

          return { result, imageB64 };
        }

        return result;
      });

      return b64ImagesResult;
    } catch (err) {
      return false;
    }
  }

  async findOne(foodId: number) {
    try {
      const result = await prisma.food.findUnique({
        where: {
          foodId,
        },
        include: {
          image: {
            select: {
              storedName: true,
              fileName: true,
            },
          },
        },
      });

      if(!result){
        return false
      }

      if(result.image){
        const { image } = result

        const B64File = await this.toB64(image)

        return ({result, B64File})
      }

      return result
    
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
      return result;
    } catch (err) {
      return false;
    }
  }

  async fileUpload(food: number, fileName: string, storedName: string) {
    try {
      const result = await prisma.image.create({
        data: {
          foodIdImage: food,
          fileName,
          storedName,
        },
      });

      if (!result) {
        return false;
      }
      return result;
    } catch (err) {
      return false;
    }
  }

  async updateFood(foodId: number, foodObject: UpdateFoodDto) {
    try {
      const result = await prisma.food.update({
        where: {
          foodId,
        },
        data: {
          foodName: foodObject.foodName,
          foodIngredients: foodObject.foodIngredients,
          foodDescription: foodObject.foodDescription,
          foodPrice: foodObject.foodPrice,
        },
      });
      return result;
    } catch (err) {
      return false;
    }
  }

  async deleteFood(foodId: number) {
    try {
      const result = await prisma.food.delete({
        where: {
          foodId,
        },
      });
      return result;
    } catch (err) {
      return false;
    }
  }
  toB64(image: Image) {
    try {
      const B64file = fs.readFileSync(`uploads/${image.storedName}`, "base64");
      return B64file;
    } catch (err) {
      return false;
    }
  }
}
