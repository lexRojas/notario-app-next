
"use client"

import { useState } from "react";
import { getIndice } from "@/app/api/indice/actions"; // Asegúrate de que la ruta sea correcta
import { generateReport } from "@/scripts/report";

export default function Indice() {
    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        quincena: "segunda",
        mes: "septiembre",
        ano: 2025,
        notario: "RODRIGO ROJAS CHAVES",
        carnet: 25794,
        fecha: "2025-07-10",
        nota: "",
    });

    // Función para manejar cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Llamada a la función getIndice con los datos del formulario
        const data = await getIndice(formData);

        await generateReport("b48f31add39093280261aa1d4b755bb4af45dfb90ac00de2c4ec97a7cd2465da", data)


    };

    return (
        <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-3">
            <h1 className="text-2xl font-bold mb-4">Formulario de Reporte</h1>
            <form onSubmit={handleSubmit} className="space-y-4">


                {/* Quincena */}
                <div>
                    <label htmlFor="quincena" className="block text-sm font-medium text-gray-700">
                        Quincena
                    </label>
                    <select
                        id="quincena"
                        name="quincena"
                        value={formData.quincena}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="segunda">Segunda</option>
                        <option value="primera">Primera</option>
                    </select>
                </div>

                {/* Mes */}
                <div>
                    <label htmlFor="mes" className="block text-sm font-medium text-gray-700">
                        Mes
                    </label>
                    <select
                        id="mes"
                        name="mes"
                        value={formData.mes}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >

                        <option value="enero">Enero</option>
                        <option value="febrero">Febrero</option>
                        <option value="marzo">Marzo</option>
                        <option value="abril">Abril</option>
                        <option value="mayo">Mayo</option>
                        <option value="junio">Junio</option>
                        <option value="julio">Julio</option>
                        <option value="agosto">Agosto</option>
                        <option value="septiembre">Septiembre</option>
                        <option value="octubre">Octubre</option>
                        <option value="noviembre">Noviembre</option>
                        <option value="diciembre">Diciembre</option>
                    </select>
                </div>

                {/* Año */}
                <div>
                    <label htmlFor="ano" className="block text-sm font-medium text-gray-700">
                        Año
                    </label>
                    <input
                        type="number"
                        id="ano"
                        name="ano"
                        value={formData.ano}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Notario */}
                <div>
                    <label htmlFor="notario" className="block text-sm font-medium text-gray-700">
                        Notario
                    </label>
                    <input
                        type="text"
                        id="notario"
                        name="notario"
                        value={formData.notario}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Carnet */}
                <div>
                    <label htmlFor="carnet" className="block text-sm font-medium text-gray-700">
                        Carnet
                    </label>
                    <input
                        type="number"
                        id="carnet"
                        name="carnet"
                        value={formData.carnet}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Fecha */}
                <div>
                    <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
                        Fecha
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Nota */}
                <div>
                    <label htmlFor="nota" className="block text-sm font-medium text-gray-700">
                        Nota
                    </label>
                    <textarea
                        id="nota"
                        name="nota"
                        value={formData.nota}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}
