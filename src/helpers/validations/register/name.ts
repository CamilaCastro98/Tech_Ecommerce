import IRegister from "@/interfaces/Register"

const name = (values:IRegister): Record<string,string> => {
    const { name } = values
    const errors: Record<string,string> = {}

    if(name.length < 5 || name.length > 35) {
        errors.name = "Name must be between 5 and 35 characters"
    }

    const regexName = /^[a-zA-Z\s]+$/
    if (name.length && !regexName.test(name)) {
        errors.name = "Name can only contain letters and spaces"
    }
    return errors
}

export default name