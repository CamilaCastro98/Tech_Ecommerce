import IRegister from "@/interfaces/Register"

const email = (values: IRegister): Record<string,string> => {
    const {email} = values
    const errors: Record<string,string> = {}

    const regexMail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.(com|COM)$/

    if (!regexMail.test(email)) {
        errors.email = "Please enter a valid email address"
    }

    return errors
    
}

export default email