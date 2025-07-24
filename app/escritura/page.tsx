'use client';

import { useEffect, useState } from "react";
import { Button, Spinner, TextInput, HR } from "flowbite-react";
import { insertValorUsual, updateValorUsual, deleteValorUsual, getData, ValorUsual } from "./escritura"; // Estas funciones debes implementarlas para interactuar con la base de datos
import TablasFiltros from "@/components/TablaFiltros";

export default function Page() {
  // Estado para manejar el formulario
  const [formData, setFormData] = useState({
    id: "",
    folio_1: 0,
    pag_1: "",
    folio_2: 0,
    pag_2: "",
    fecha: new Date().toLocaleDateString("en-CA"), // Formato YYYY-MM-DD
    escritura: 0,
    tomo: 1,
    partes: "",
    hora: 0,
    minutos: 0,
    contrato: "",
    entero: "",
    firmas: 0,
    lugar: "",
    tomo_registro: 0,
    asiento: 0,
  });

  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(false);
  // Estado para manejar mensajes de error o éxito
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  // Estado para manejar los datos de la tabla
  const [data, setData] = useState<ValorUsual[]>([]);

  // carga los datos iniciales
  useEffect(() => {

    const loadData = async () => {
      setLoading(true);
      try {
        const response = await getData(); // Debes implementar esta función para obtener los datos
        if (response.succesful) {

          if (response.data) {
                      
            console.log(response.data);
            setData(response.data)

          } else {
            setData([]);
            setErrorMessage("No hay datos disponibles.");
          }

        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        setErrorMessage("Error al cargar los datos: " + error);
      } finally {
        setLoading(false);
      }

    }
    loadData();

  }, [])





  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario (Insertar, Modificar, Borrar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let response;
      if (formData.id) {
        // Si existe un ID, se realiza una actualización o eliminación
        if (formData.id === "delete") {
          response = await deleteValorUsual(formData.id);
          setSuccessMessage("Escritura eliminada exitosamente.");
        } else {
          response = await updateValorUsual(formData);
          setSuccessMessage("Escritura modificada exitosamente.");
        }
      } else {
        // Si no hay ID, se realiza una inserción
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        response = await insertValorUsual(formData);
        setSuccessMessage("Escritura registrada exitosamente.");
      }

      setErrorMessage("");
    } catch (error) {
      console.log(error)
      setErrorMessage("Ocurrió un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  function modifyItem(item: Record<string, unknown>, idx?: number | undefined): void {
    throw new Error("Function not implemented.");
  }

  function deleteItem(item: Record<string, unknown>, idx?: number | undefined): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="md:w-1/2  w-[95%]   mx-auto mt-10 p-3 bg-white border-2 border-blue-800 rounded-lg shadow-lg shadow-gray-400">
        <h1 className="text-2xl font-bold text-left mb-6">Registro de Escritura</h1>

        <HR className="mt-3 mb-5" />
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <div>
              <label htmlFor="tomo" className="block text-gray-700 mb-2">Tomo</label>
              <TextInput
                id="tomo"
                type="number"
                name="tomo"
                value={formData.tomo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="escritura" className="block text-gray-700 mb-2">Escritura</label>
              <TextInput
                id="escritura"
                type="number"
                name="escritura"
                value={formData.escritura}
                onChange={handleChange}
                required
              />
            </div>


          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label htmlFor="folio_1" className="block text-gray-700 mb-2">Folio 1</label>
              <TextInput
                id="folio_1"
                type="number"
                name="folio_1"
                value={formData.folio_1}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="pag_1" className="block text-gray-700 mb-2">Página 1</label>
              <TextInput
                id="pag_1"
                type="text"
                name="pag_1"
                value={formData.pag_1}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="folio_2" className="block text-gray-700 mb-2">Folio 2</label>
              <TextInput
                id="folio_2"
                type="number"
                name="folio_2"
                value={formData.folio_2}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="pag_2" className="block text-gray-700 mb-2">Página 2</label>
              <TextInput
                id="pag_2"
                type="text"
                name="pag_2"
                value={formData.pag_2}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="fecha" className="block text-gray-700 mb-2">Fecha</label>
              <TextInput
                id="fecha"
                type="date"
                name="fecha"
                value={formData.fecha}

                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="hora" className="block text-gray-700 mb-2">Hora</label>
              <TextInput
                id="hora"
                type="number"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="minutos" className="block text-gray-700 mb-2">Minutos</label>
              <TextInput
                id="minutos"
                type="number"
                name="minutos"
                value={formData.minutos}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">

            <div>
              <label htmlFor="lugar" className="block text-gray-700 mb-2">Lugar</label>
              <TextInput
                id="lugar"
                type="text"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="partes" className="block text-gray-700 mb-2">Partes</label>
              <TextInput
                id="partes"
                type="text"
                name="partes"
                value={formData.partes}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="contrato" className="block text-gray-700 mb-2">Contrato</label>
              <TextInput
                id="contrato"
                type="text"
                name="contrato"
                value={formData.contrato}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="entero" className="block text-gray-700 mb-2">Entero</label>
              <TextInput
                id="entero"
                type="text"
                name="entero"
                value={formData.entero}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="firmas" className="block text-gray-700 mb-2">Firmas</label>
              <TextInput
                id="firmas"
                type="number"
                name="firmas"
                value={formData.firmas}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">

            <div>
              <label htmlFor="tomo_registro" className="block text-gray-700 mb-2">Tomo (Registro)</label>
              <TextInput
                id="tomo_registro"
                type="number"
                name="tomo_registro"
                value={formData.tomo_registro}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="asiento" className="block text-gray-700 mb-2">Asiento (Registro)</label>
              <TextInput
                id="asiento"
                type="number"
                name="asiento"
                value={formData.asiento}
                onChange={handleChange}
              />
            </div>

          </div>

          <Button type="submit" className="w-full">
            {formData.id ? "Modificar Escritura" : "Registrar Escritura"}
          </Button>
        </form>

        <TablasFiltros
          data={data}
          fields={[
            { field: 'id', label: 'ID', defaultfilter: false },
            { field: 'escritura', label: 'Escritura', defaultfilter: true },
            { field: 'contrato', label: 'Contrato', defaultfilter: true },
            { field: 'partes', label: 'Partes', defaultfilter: true },

          ]}
          itemsPerPage={5}
          handleModifyItem={modifyItem}
          handleDeleteItem={deleteItem}
        />

        {loading && (
          <div className="mt-4 text-center text-gray-500">
            <Spinner aria-label="Loading" />
            <span className="ml-2">Procesando...</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="mt-4 text-green-500 text-center">{successMessage}</div>
        )}
      </div>
    </>
  );
}
