import IRegister from "@/interfaces/Register"

const phone = (values:IRegister): Record<string,string> => {
    const {phone} = values
    const errors: Record<string,string> = {}

    if(Number(phone) < 1000000000) {
        errors.phone = "Phone number must contain at least 10 digits"
    }

    return errors
}

export default phone