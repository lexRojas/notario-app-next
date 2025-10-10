/* eslint-disable */


'use client'

import { IconAdd, IconEdit, IconDelete } from "@/icons/icons/Icons"
import { CustomListValue, JsonResponse } from "@/types/types"
import { TextInput } from "flowbite-react"
import { useEffect, useState } from "react"





type propsCustomList = {

    data: CustomListValue[] | undefined,
    handleSelectItem: (index: number, value: CustomListValue) => void,
    title: string,
    handleAddItem: (value: CustomListValue) => JsonResponse,
    handleModifyItem: (value: CustomListValue) => JsonResponse,
    handleDeleteItem: (value: CustomListValue) => JsonResponse,
}

interface FormDataType {
    id: number; // o el tipo que corresponda (por ejemplo, number)
    descripcion: string; // o el tipo que corresponda
}



export default function CustomList(
    props: propsCustomList
) {


    const { data, handleSelectItem, title, handleAddItem, handleDeleteItem, handleModifyItem } = props

    //set DataList, que es la que usa la lista
    const [list, setList] = useState<CustomListValue[]>([])

    // Estado inicial 

    useEffect(() => {
        if (data) {
            setList(data)
        }

    }, [data])



    // Estado para manejar el formulario
    const [formData, setFormData] = useState<FormDataType>({
        id: 0,
        descripcion: ""
    });
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
    const handleRowClick = (rowIndex: number, value: CustomListValue) => {
        setSelectedRow(rowIndex);
        handleSelectItem(rowIndex, value)


        setFormData({

            "id": Number(value.id),
            "descripcion": value.descripcion ?? ""
        })

    };


    const addValue = () => {

        const newElement: CustomListValue = {
            "id": 0,
            "descripcion": formData.descripcion
        }

        const { succesful, id } = handleAddItem(newElement)

        if (succesful) {

            newElement.id = id
            const newList = [...list, newElement]
            setList(newList)

        }





    }

    return (
        <div className="flex flex-1 flex-col  gap-4 mb-4" >

            <div className="flex ">
                <label htmlFor="registro_descripcion" className="block text-gray-700 text-sm"> {title}</label>
            </div>
            <div className="flex  flex-row gap-1">
                <div className="w-10 ">

                    <TextInput
                        id="id"
                        name="id"
                        value={formData.id}
                        type="number"
                        readOnly
                        onChange={handleChange}
                        sizing="sm"
                        className="text-center"
                    />
                </div>
                <div className="flex-1">
                    <TextInput
                        id="descripcion"
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        placeholder="Descripción del Registro"
                        sizing="sm"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-center w-7 h-9  cursor-pointer"
                    onClick={addValue}>
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

                        {list?.map((value, index) => (
                            <tr
                                key={value.id}
                                className={`cursor-pointer ${selectedRow === index ? 'bg-gray-300' : ''}`}
                                onClick={() => handleRowClick(index, value)}
                            >
                                <td>{value.id}</td>
                                <td >{value.descripcion}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    )
}