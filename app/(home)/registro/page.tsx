
/* eslint-disable */

'use client';




import { useEffect, useState } from "react";
import { Spinner, HR, } from "flowbite-react";
import { addRegistro, obtenerDatosCompletos } from "./registro";



import "@/styles/Icons_estilos.css"; // Asegúrate de que este archivo exista y tenga los estilos necesarios


import { CustomListValue, JSONData, JsonResponse, RegistroActo } from "@/types/types";
import ActosTable from "@/components/ActosTable";
import CustomList from "@/components/CustomList";


// Estructura del formulario inicial



export default function Page() {


    // Datos iniciales
    const [data, setData] = useState<JSONData>();

    // Datos del registro de actos 
    const [dataActos, setDataActos] = useState<RegistroActo[]>();

    // Datos iniciales lista Registro 
    const [listValuesRegistro, setListValuesRegistro] = useState<CustomListValue[]>();



    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(false);

    // Estado para manejar mensajes de error o éxito
    const [errorMessage, setErrorMessage] = useState("");



    // Carga inicial de datos
    useEffect(() => {

        const loadData = async () => {
            const datos: JSONData = await obtenerDatosCompletos();
            if (datos) {


                const newValuesRegistro: CustomListValue[] = datos.registros.map((valor) => {
                    return (
                        {
                            id: valor.id_registro,
                            descripcion: valor.registro_descripcion
                        }
                    )

                })

                setListValuesRegistro(newValuesRegistro)
                setData(datos);
            } else {
                setErrorMessage("No se pudieron cargar los datos.");
            }
        }

        setLoading(true);
        loadData()
        setLoading(false);

    }, [])


    const registro_handleSelectItem = (index: number, value: CustomListValue) => {


    }

    // const registro_handleAddItem = (value: CustomListValue): JsonResponse => {






    //     // const result = await addRegistro(value.descripcion ?? "")

    //     // if (result) {

    //     //     return { succesful: true, id: result.id_registro }

    //     // } else {
    //     //     return { error: "no se pudo" }
    //     // }


    // }
    const registro_handleModifyItem = (value: CustomListValue) => {

    }
    const registro_handleDeleteItem = (value: CustomListValue) => {

    }





    return (
        <>
            <div className="md:w-1/2  w-[95%]   mx-auto mt-10 p-3 bg-white border-2 border-blue-800 rounded-lg shadow-lg shadow-gray-400">
                <h1 className="text-2xl font-bold text-left mb-6">Registro / Actos Notariales</h1>

                <HR className="mt-3 mb-5" />


                <div className="flex flex-col lg:flex-row gap-4 mb-2 " >



                    <div className="flex flex-col lg:flex-row gap-4 ">
                        {/* Seccion de  Registro y Actos Notariales */}

                        <div className="flex flex-1 flex-col gap-4 mb-4">
                            {/* <CustomList
                                data={listValuesRegistro}
                                handleSelectItem={registro_handleSelectItem}
                 
                                handleDeleteItem={ }
                                handleModifyItem={ }
                                title="Registros"

                            /> */}
                        </div>

                        <div className="flex flex-1 flex-col gap-4 mb-4">

                            {/**aqui va la lista de actos */}
                        </div>
                    </div >

                </div>



                {/* Seccion de  Timbres */}
                < div className="flex flex-col lg:flex-row gap-4 mb-2 " >
                    <div className="flex flex-1  p-2 bg-amber-400">
                        <p>Lista 1</p>
                    </div>
                    <div className="flex flex-0  p-2 bg-amber-400">
                        <p>Lista 1</p>
                    </div>

                    <div className="flex flex-1 p-2  bg-red-400">
                        <p>Lista 2</p>
                    </div>

                </div >


                {/* Seccion de  Botones */}
                <div className="flex flex-row  gap-4 justify-center">
                </div>





                {loading && (
                    <div className="mt-4 text-center text-gray-500">
                        <Spinner aria-label="Loading" />
                        <span className="ml-2">Procesando...</span>
                    </div>
                )
                }
                {errorMessage && (
                    <div className="mt-4 text-center text-gray-500">

                        <span className="ml-2">{errorMessage}</span>
                    </div>

                )}

            </div >
        </>
    );
}
