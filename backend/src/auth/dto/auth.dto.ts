export class AuthDto{
    userEmail!:string;
    userPassword!:string

    validate():string[]{
        const errors: string[] = []

        const validatePassword = this.validatePassword();
        const validateEmail = this.validateEmail();

        if(validatePassword) errors.push(validatePassword)
        if (validateEmail) errors.push(validateEmail)

        return errors
    }

    private validatePassword():string | null{
        if(!this.userPassword) return "Senha requerida"
        if(typeof this.userPassword !== "string") return "A senha deve ser formada por um texto"
        if(this.userPassword.length < 8) return "Senha invalida"
        return null
    }

    private validateEmail():string|null{
        if(!this.userEmail)return "email requerido"
        if(typeof this.userEmail !== "string") return "email invalido"
        return null
    }
}