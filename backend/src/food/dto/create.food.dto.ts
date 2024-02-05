export class CreateFoodDto {
  foodName!: string;
  foodIngredients!: string[];
  foodDescription!: string;
  foodPrice!: number;

  validate(): string[]{
    const errors: string[] = [];

    const nameError = this.validateName()
    const ingredientsError = this.validateIngredients()
    const descriptionError = this.validateDescription()
    const priceError = this.validatePrice()



    if(nameError)errors.push(nameError);
    if(ingredientsError)errors.push(ingredientsError);
    if(descriptionError)errors.push(descriptionError);
    if(priceError)errors.push(priceError);

    return errors;
  }

  private validateName(): string | null {
    if(!this.foodName)return"Nome da receita requerido"
    if(typeof this.foodName !== "string")return"Nome da receita inválido"
    return null
  }
  private validateIngredients(): string | null {
    if(!this.foodIngredients)return"ingredientes da receita requeridos"
    if(typeof this.foodIngredients !== "string")return"ingredientes da receita inválidos"
    return null
  }
  private validateDescription(): string | null {
    if(!this.foodDescription)return"Descrição da receita requerida"
    if(typeof this.foodDescription !== "string")return"descrição da receita invalido"
    return null
  }
  private validatePrice(): string | null {
    if(!this.foodPrice)return"Preço da receita requerido"
    return null
  }
 
  
  
}
