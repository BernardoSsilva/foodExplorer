export class CreateUserDto {
  userName!: string;
  userEmail!: string;
  userPassword!: string;

  validate(): string[]{
    const errors: string[] = [];
    const nameError = this.validateName()
    const emailError = this.validateEmail()
    const passwordError = this.validatePassword()

    if(nameError) errors.push(nameError);
    if(emailError) errors.push(emailError);
    if(passwordError) errors.push(passwordError)
    return errors;
  }

  private validateName(): string | null {
    if (!this.userName ) return "nome de usuário invalido"
    if (typeof this.userName !== "string") return "nome de usuário deve ser composto de um texto"
    return null
  }

  private validateEmail():string|null{
    if(!this.userEmail) return "O email deve ser informado"
    if (typeof this.userEmail !=="string") return "O email deve ser composto de um texto"
    return null
  }

  private validatePassword():string|null{
    if(!this.userPassword) return "A senha deve ser informada"
    if (typeof this.userPassword !=="string") return "A senha deve ser composta de um texto"
    if(this.userPassword.length < 8) return "A senha deve ter no mínimo 8 dígitos"
    return null
  }
}
