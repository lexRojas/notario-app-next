'use client'

import { getData } from "@/app/api/escrituras/actions"
import { ValorUsual } from "@/types/types"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function escrituras() {

    const [escrituras, setEscrituras] = useState<ValorUsual[]>()


    useEffect(() => {

        const loadData = async () => {
            const result = await getData()
            setEscrituras(result.data!)
        }

        loadData()

    }, [])


    return (
        <div className="p-10">
            <div className="h-200 overflow-y-auto border rounded-lg">
                <Table >
                    <TableHead className=" sticky top-0 bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableRow className="text-black ">
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Escritura</TableHeadCell>
                            <TableHeadCell>F.Inicio</TableHeadCell>
                            <TableHeadCell>F.Final</TableHeadCell>
                            <TableHeadCell>Fecha</TableHeadCell>
                            <TableHeadCell>Hora</TableHeadCell>
                            <TableHeadCell>Contrato</TableHeadCell>
                            <TableHeadCell>Partes</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">

                        {escrituras?.map((escritura, index) => {
                            return (
                                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{escritura.id}</TableCell>
                                    <TableCell>{escritura.escritura}</TableCell>
                                    <TableCell>{escritura.folio_1 + escritura.pag_1?.substring(0,1)!}</TableCell>
                                    <TableCell>{escritura.folio_2 + escritura.pag_2?.substring(0,1)!}</TableCell>
                                    <TableCell>{escritura.fecha}</TableCell>
                                    <TableCell>{escritura.hora}</TableCell>
                                    <TableCell>{escritura.contrato}</TableCell>
                                    <TableCell>{escritura.partes}</TableCell>
                                </TableRow>
                            )
                        })}
                        


                    </TableBody>
                </Table>
            </div>
        </div>
    )

}