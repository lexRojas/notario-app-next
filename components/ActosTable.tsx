'use client'

import { IconAdd, IconEdit, IconDelete } from "@/icons/icons/Icons"
import { RegistroActo } from "@/types/types"
import { TextInput } from "flowbite-react"
import { useState } from "react"



type propsActosTable = {

    data: RegistroActo[] | undefined,
    handleResolve: (index: number, value: RegistroActo) => void


}

export default function ActosTable(
    props: propsActosTable
) {


    const { data, handleResolve } = props

    // Estado para manejar el formulario
    const [formData, setFormData] = useState([]);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Estado para manejar la fila seleccionada
    const handleRowClick = (rowIndex: number, value: RegistroActo) => {
        setSelectedRow(rowIndex);
        handleResolve(rowIndex, value)

    };

    return (
        <div className="flex flex-1 flex-col  gap-4 mb-4" >

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

                        {data?.map((acto, index) => (
                            <tr
                                key={acto.acto_id_acto}
                                className={`cursor-pointer ${selectedRow === index ? 'bg-gray-300' : ''}`}
                                onClick={() => handleRowClick(index, acto)}
                            >
                                <td>{acto.acto?.id_acto}</td>
                                <td >{acto.acto?.acto_descripcion}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )
}