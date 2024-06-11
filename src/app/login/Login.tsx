"use client"
import ButtonFull from "@/components/secondary/ButtonFull";
import ButtonTransparent from "@/components/secondary/ButtonTransparent";
import ILoginData from "@/interfaces/Login";
import { Formik, Field, Form, ErrorMessage } from "formik";
import validateLogin from "../../helpers/validations/login/login"
import { fetchLogin} from "@/helpers/petitions/petitions";
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react";
import Link from "next/link";

const Login = () => {
    const router = useRouter()
    const [errorSubmiting, setErrorSubmiting] = useState<string>("")

    const handleSubmit = async (values:ILoginData) => {
        try {
            const login = await fetchLogin(values)
                if (login.ok) {
                   router.push("/") 
                } else {
                    setErrorSubmiting("The data you entered is incorrect")
                }
        }
        catch(error) {
            alert(error)
        }
    }

    useEffect(()=>{

    },[errorSubmiting])

    return (
        <div className="flex justify-center items-center">
            <div className=" m-8 mt-24 pb-4 border border-gray-50 rounded-md">
                <div className="bg-gray-50 w-full p-8">
                    <h1 className="text-lg text-p-color font-semibold mb-4">Welcome Back!</h1>
                    <p className="text-p-color font-normal text-base mb-4">Login and explore the latest tech deals</p>
                </div>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validate={validateLogin}
                    onSubmit={handleSubmit}
                >
                    <Form className="px-10 py-6">
                        <div className="mb-4">
                          { errorSubmiting && <div className="mb-4 p-1 border-2 text-center text-sm border-red-500 rounded-md font-semibold text-red-600 bg-red-300">{errorSubmiting}</div>}
                            <label htmlFor="email" className="block text-gray-50 mb-2">Email:</label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                onFocus={()=>setErrorSubmiting("")}
                                placeholder="mail@example.com"
                                className="rounded-md w-full"
                                autoComplete="email"
                            />
                            <ErrorMessage name="email" className="text-red-500" component="div" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-50 mb-2">Password:</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                onFocus={()=>setErrorSubmiting("")}
                                placeholder="*********"
                                className="rounded-md w-full"
                            />
                            <ErrorMessage name="password" className="text-red-500" component="div" />
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="w-full rounded-sm bg-t-color"><ButtonFull content="Submit" type="submit"/></div>
                            <Link href="/">
                                <ButtonTransparent content="Cancel" type="button"/>
                            </Link>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-sm text-gray-50">Not a member yet? <Link className="text-t-color font-semibold hover:underline" href="/register">Register</Link></p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
