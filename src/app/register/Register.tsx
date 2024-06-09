"use client";
import ButtonFull from "@/components/secondary/ButtonFull";
import ButtonTransparent from "@/components/secondary/ButtonTransparent";
import IRegister from "@/interfaces/Register";
import { Formik, Field, Form, ErrorMessage } from "formik";
import register from "../../helpers/validations/register/register"
import { fetchRegister } from "@/helpers/petitions/petitions";
import Link from "next/link";
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2'


const Register = () => {

    const router = useRouter()

    const handleSubmit = async(values:IRegister) => {
        try {
            const register = await fetchRegister(values)
            if (register){
                    Swal.fire({
                                position: "top-start",
                                icon: "success",
                                title: "Hi! You are now registered!",
                                showConfirmButton: false,
                                timer: 1500
                                    });
                    router.push("/")
            } else {
                 alert("no se pudo registrar")
            }
        }
        catch(error) {
            return error
        }
    }

    return (
        <div className="flex justify-center">
            <div className="m-8 mt-24 border border-gray-50 rounded-md md:w-2/3 lg:w-5/12">
                <div className="bg-gray-50 w-full p-6">
                    <h1 className="text-lg text-p-color font-semibold mb-4">Get Started With Us!</h1>
                    <p className="text-p-color text-base mb-4">Enter your information to find the best in tech</p>
                </div>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        address: "",
                        phone: "",
                    }}
                    validate={register}
                    onSubmit={handleSubmit}
                >
                    <Form className="px-10 py-6 flex flex-col items-center">
                        <div className="mb-4 w-full">
                            <label htmlFor="name" className="block text-gray-50 mb-2">Name:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Jane Doe"
                                className="form-input w-full rounded-md"
                                autoComplete="given-name"
                            />
                            <ErrorMessage name="name" className="text-red-500" component="div" />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="email" className="block text-gray-50 mb-2">Email:</label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                placeholder="email@example.com"
                                className="form-input w-full rounded-md"
                                autoComplete="email"
                            />
                            <ErrorMessage name="email" className="text-red-500" component="div" />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="password" className="block text-gray-50 mb-2">Password:</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="*******"
                                className="form-input w-full rounded-md"
                            />
                            <ErrorMessage name="password" className="text-red-500" component="div" />
                        </div>
                        <hr className="my-4 w-full" />
                            <div className="w-full">
                                <label htmlFor="address" className="block text-gray-50 mb-2">Address:</label>
                                <Field
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="1234 Maple Street, Springfield, IL 62704, USA"
                                    className="w-full rounded-md"
                                    autoComplete="address"
                                />
                                <ErrorMessage name="address" className="text-red-500" component="div" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="phone" className="block text-gray-50 mt-4 mb-2">Phone:</label>
                                <Field
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    placeholder="0123456789"
                                    className="form-input w-full rounded-md"
                                    autoComplete="tel"
                                />
                                <ErrorMessage name="phone" className="text-red-500" component="div" />
                            </div>
                        <div className="flex flex-col mt-10 gap-4 w-full">
                        <div className="w-full rounded-sm bg-t-color"><ButtonFull type='submit' content="Submit"/></div>
                            <Link href="/">
                                <ButtonTransparent content="Cancel"/>
                            </Link>
                        </div>
                        <div className="text-center mt-3 w-full">
                            <p className="text-sm text-gray-50 mb-4">Already have an account? <Link href="/login" className="text-t-color font-semibold hover:underline">Login</Link></p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;

