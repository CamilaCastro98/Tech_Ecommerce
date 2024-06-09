import ILoginData from "@/interfaces/Login"

const validateLogin = (values:ILoginData): Record<string,string>=> {
    let errors: Record<string, string> = {}
    const {email,password} = values

    if (!email) {
        errors.email = "Please enter email"
    }

    if (!password) {
        errors.password = "Please enter password"
    }
    return errors
}

export default validateLogin