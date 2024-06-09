import IRegister from "@/interfaces/Register"

const dataExistence = (values:IRegister): Record<string, string> => {
    const { name,email,phone,address,password } = values
    const errors: Record<string, string> = {}
    
    if (!name) {
        errors.name = "Please enter your name"
    }
    if (!email) {
        errors.email = "Please enter your email"
    }
    if (!phone) {
        errors.phone = "Please enter your phone number"
    }
    if (!address) {
        errors.address = "Please enter your address"
    }
    if (!password) {
        errors.password = "Please enter your password"
    }

    return errors
}

export default dataExistence