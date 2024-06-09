import IRegister from "@/interfaces/Register"

const password = (values:IRegister): Record<string, string> => {
    const {password} = values
    const errors: Record<string, string> = {}

    if (password.length < 5) {
        errors.password = "Password must be at least 5 characters long"
    }

    const regexPassword = /^(?=.*[A-Z])(?=.*\d).+/
    if (!(regexPassword.test(password))) {
        errors.password = "Password must contain at least one uppercase letter and one digit"
    }
    
    return errors
}

export default password