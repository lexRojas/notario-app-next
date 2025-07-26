'use client';

import { useEffect, useState } from "react";
import { Button, Spinner, HR, TextInput } from "flowbite-react";
import { obtenerDatosCompletos } from "./registro";
import { IconAdd, IconDelete, IconEdit } from "@/icons/icons/Icons";


import "@/app/styles/Icons_estilos.css"; // Asegúrate de que este archivo exista y tenga los estilos necesarios


import { JSONData } from "./types";




// Estructura del formulario inicial



export default function Page() {
    // Estado para manejar el formulario
    const [formData, setFormData] = useState([]);

    // Datos iniciales
    const [data, setData] = useState<JSONData>();

    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(false);

    // Estado para manejar mensajes de error o éxito
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    // Carga inicial de datos (simulación)
    useEffect(() => {

        const loadData = async () => {
            const datos: JSONData = await obtenerDatosCompletos();
            if (datos) {
                console.log(datos);
                setData(datos);
            } else {
                setErrorMessage("No se pudieron cargar los datos.");
            }
        }

        setLoading(true);
        loadData()
        setLoading(false);

    }, [])



    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Estado para manejar la fila seleccionada
    const handleRowClick = (rowIndex: number) => {
        setSelectedRow(rowIndex);

    };


    // Función para manejar el envío del formulario (Insertar, Modificar, Borrar)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submitter = e.nativeEvent as SubmitEvent;
        const button = submitter.submitter as HTMLButtonElement;

        try {
            if (button && button.name === 'insert') {
                // Lógica para "Insertar"

                setSuccessMessage("Escritura registrada exitosamente.");

                setTimeout(() => {
                    setSuccessMessage("");
                }, 2500);

            } else if (button && button.name === 'delete') {
                // Lógica para "Borrar"


                setSuccessMessage('Registro eliminado correctamente.');
                setTimeout(() => {
                    setSuccessMessage("");
                }, 2500);

            } else {
                if (formData.id) {
                    // Lógica para "Modificar"

                    setSuccessMessage("Escritura modificada exitosamente.")
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 2500);
                }
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Ocurrió un error al procesar la solicitud.');

        } finally {
            setFormData([])
            setLoading(false);
        }
        ;




    };


    return (
        <>
            <div className="md:w-1/2  w-[95%]   mx-auto mt-10 p-3 bg-white border-2 border-blue-800 rounded-lg shadow-lg shadow-gray-400">
                <h1 className="text-2xl font-bold text-left mb-6">Registro / Actos Notariales</h1>

                <HR className="mt-3 mb-5" />
                <form onSubmit={handleSubmit}>
                    {/* Campos del formulario */}
                    <div className="flex flex-col lg:flex-row gap-4 ">
                        {/* Seccion de  Registro y Actos Notariales */}
                        <div className="flex flex-1 flex-col  gap-4 mb-4 bg-bl" >

                            <div className="flex ">
                                <label htmlFor="registro_descripcion" className="block text-gray-700 text-sm">Registro</label>
                            </div>
                            <div className="flex  flex-row gap-1">
                                <div className="flex-1">
                                    <TextInput
                                        id="registro_descripcion"
                                        type="text"
                                        name="registro_descripcion"
                                        placeholder="Descripción del Registro"
                                        sizing="sm"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-center w-7 h-9  cursor-pointer">
                                    <IconAdd className="icon-add" />
                                </div>

                                <div className="flex items-center justify-center w-7 h-9  cursor-pointer">
                                    <IconEdit className="icon-modify" />
                                </div>
                                <div className="flex items-center justify-center w-7 h-9  cursor-pointer">
                                    <IconDelete className="icon-delete" />
                                </div>



                            </div>

                            {/* Tabla de Registros */}
                            <div className="table-container" >
                                <table >
                                    <thead >
                                        <tr>
                                            <td className="w-16">ID</td>
                                            <td>Description</td>
                                        </tr>
                                    </thead>
                                    <tbody >

                                        {data?.registros.map((registro, index) => (
                                            <tr
                                                key={registro.id_registro}
                                                className={`cursor-pointer ${selectedRow === index ? 'bg-gray-300' : ''}`}
                                                onClick={() => handleRowClick(index)}
                                            >
                                                <td>{registro.id_registro}</td>
                                                <td >{registro.registro_descripcion}</td>
                                            </tr>
                                        )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-4 mb-4 bg-amber-200">
                            <p>Lista 2</p>
                        </div>
                    </div >





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

                        {!(formData.id) && (
                            <Button
                                name="insert"
                                type="submit"
                                className="">
                                Registrar Escritura
                            </Button>
                        )}
                        {formData.id > 0 && (<>

                            <Button
                                name="modify"
                                type="submit"
                                className=""
                            >
                                Modificar Escritura
                            </Button>

                            <Button
                                name="delete"
                                type="submit"
                                className=""
                                color={"red"} >
                                Eliminar Escritura
                            </Button>
                        </>
                        )}
                        <Button
                            onClick={() => setFormData(blankForm)}
                        >
                            Cancelar
                        </Button>
                    </div>


                </form >


                {loading && (
                    <div className="mt-4 text-center text-gray-500">
                        <Spinner aria-label="Loading" />
                        <span className="ml-2">Procesando...</span>
                    </div>
                )
                }

                {
                    errorMessage && (
                        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
                    )
                }

                {
                    successMessage && (
                        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
                    )
                }
            </div >
        </>
    );
}
