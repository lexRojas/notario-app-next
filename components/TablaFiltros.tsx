'use client'

import { customThemeTableHead, customThemePagination } from "@/scripts/themes";
import { TextInput, Select, Table, Pagination, Checkbox, ThemeProvider, TableHead, TableHeadCell, TableBody, TableCell, TableRow } from "flowbite-react"
import { IconEdit, IconDelete } from "@/icons/icons/Icons";
import { ChangeEvent, useState, useEffect } from "react"
import { getFormateDate, } from "@/scripts/tools"



type TablasFiltrosProps<T extends Record<string, unknown>> = {
    data: T[]
    fields: { field: string; label: string, defaultfilter: boolean }[];
    itemsPerPage: number;
    handleModifyItem: (item: T, idx?: number) => void,
    handleDeleteItem: (item: T, idx?: number) => void,
}

export default function TablasFiltros<T extends Record<string, unknown>>(props: TablasFiltrosProps<T>) {

    const { data, fields, itemsPerPage, handleModifyItem, handleDeleteItem } = props


    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState<T[]>(data); // Estado para datos filtrados

    const [dataForm, setDataForm] = useState({
        selectorField: fields.filter(field => field.defaultfilter)[0]?.field || "", // Asegura que haya un valor inicial
        filterText: ''
    });

    // **Efecto para actualizar los datos filtrados cuando cambia el filtro**
    useEffect(() => {
        const { selectorField, filterText } = dataForm;

        if (!filterText) {
            setFilteredData(data); // Si no hay filtro, usa los datos originales
            return;
        }

        const filtered = data.filter(item =>
            item[selectorField]?.toString().toLowerCase().includes(filterText.toLowerCase())
        );

        setFilteredData(filtered);
        setCurrentPage(1); // Resetear paginación al filtrar
    }, [dataForm.filterText, dataForm.selectorField, data, dataForm]);

    // **Calcular los datos a mostrar en la página actual**
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // **Calcular el número total de páginas**
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) > 0 ? Math.ceil(filteredData.length / itemsPerPage) : 1;

    // **Manejador de cambios en los filtros**
    const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDataForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const isValidDate = (value: unknown): value is Date => {

        const fechaStr: string = String(value)

        // Primero, comprobamos que el formato sea "yyyy-mm-dd"
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(fechaStr)) {
            return false;
        }

        // Separamos la cadena en año, mes y día
        const [anio, mes, dia] = fechaStr.split('-').map(Number);

        // Creamos un objeto Date (recordar que el mes en Date es 0-indexado)
        const fecha = new Date(anio, mes - 1, dia);

        // Verificamos que el objeto Date coincida con los valores ingresados
        return (
            fecha.getFullYear() === anio &&
            fecha.getMonth() === mes - 1 &&
            fecha.getDate() === dia
        );

    };

    return (
        <div>
            {/* FILTROS */}
            <div className="flex flex-row text-xs gap-2 p-3">
                <div>
                    <p>Buscar valor:</p>
                    <TextInput
                        name="filterText"
                        placeholder="Valor del filtro"
                        value={dataForm.filterText}
                        onChange={handleChanges}
                    />
                </div>
                <div>
                    <p>Tipo de búsqueda:</p>
                    <Select
                        name="selectorField"
                        value={dataForm.selectorField}
                        onChange={handleChanges}
                    >
                        {fields.map((item, idx) => (
                            <option key={idx} value={item.field}>
                                {item.label}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* TABLA */}
            <div className="overflow-x-auto p-3">
                <ThemeProvider theme={customThemeTableHead}>
                    <Table hoverable striped>
                        <TableHead className="bg-slate-700">
                            <TableRow>
                                {fields.map((field, idx) => (
                                    <TableHeadCell className="text-center" key={idx}>{field.label}</TableHeadCell>
                                ))}
                                <TableHeadCell>Acciones</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {currentData.map((value, index) => (
                                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    {fields.map((field, idx) => {
                                        const cellValue = value[field.field] as Date | string | boolean | number;
                                        const esFecha = isValidDate(cellValue)

                                        if (esFecha) {

                                            const fechaStr = String(cellValue)

                                            return (
                                                <TableCell key={idx}>
                                                    {getFormateDate(fechaStr)}

                                                </TableCell>
                                            );
                                        } else {

                                            return (
                                                <TableCell key={idx}>
                                                    {typeof cellValue === "string" && cellValue}
                                                    {typeof cellValue === "boolean" && <div className="flex justify-center">
                                                        <Checkbox readOnly disabled checked={cellValue} />
                                                    </div>}
                                                    {typeof cellValue === "number" && Number.parseInt(cellValue.toString()).toLocaleString()}

                                                </TableCell>
                                            );
                                        }
                                    }



                                    )}
                                    <TableCell className="flex justify-center">
                                        <div className="flex justify-between gap-1">
                                            <IconEdit onClick={() => handleModifyItem(value, index + ((currentPage - 1) * itemsPerPage))} className="cursor-pointer" height={15} />
                                            <IconDelete onClick={() => handleDeleteItem(value, index + ((currentPage - 1) * itemsPerPage))} className="cursor-pointer" height={15} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ThemeProvider>
            </div>

            {/* PAGINACIÓN */}
            <div className="flex flex-col sm:flex-row justify-center p-2">
                <ThemeProvider theme={customThemePagination}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        showIcons
                    />
                </ThemeProvider>
            </div>
        </div>
    );
}
