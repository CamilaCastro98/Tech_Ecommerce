import IContainer from "@/interfaces/Container";


const CardsContainer: React.FC<IContainer> = ({children,title}) => {

    return (
        <>
            <div className="flex mt-16 flex-col mx-4" >
                <h1 className="text-gray-50 mx-4 font-light text-center text-2xl">{title}</h1>
                <div className="flex mt-8 mb-10 flex-wrap">
                    {children}
                </div>
            </div>
        </>
    )
}

export default CardsContainer