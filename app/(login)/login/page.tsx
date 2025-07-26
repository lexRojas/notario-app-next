'use client';

import { useState } from "react";
import { Button, HR, Spinner, TextInput } from "flowbite-react";
import { getUserByUsername } from "./login";
import { useRouter } from "next/navigation";





export default function Page() {


  const navegate = useRouter();

  // Estado para manejar mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  //estado para manejar el estado de carga
  const [loading, setLoading] = useState(false);
  // Estado para manejar el estado de éxito
  const [success, setSuccess] = useState(false);


  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccess(false);
    // Aquí podrías agregar la lógica para verificar el acceso
    const res = await getUserByUsername(formData);

    if (res.susseful) {
      setSuccess(true);
      navegate.push("/");
      setErrorMessage("");
    } else {
      setErrorMessage("Usuario o contraseña incorrectos");
      setSuccess(false);
    }
    setLoading(false);

  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border-2 border-blue-800  rounded-lg shadow-lg shadow-gray-400">
        <h1 className={`ms-madi-regular text-4xl font-bold text-center mb-0`}>ErreRojas Consultores</h1>

        <HR className="mt-3 mb-5" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Nombre de usuario
            </label>
            <TextInput
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="geist-font"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Contraseña
            </label>
            <TextInput
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="geist-font"
            />
          </div>

          <Button type="submit" className="w-full">
            Verificar Acceso
          </Button>
        </form>
        {loading && (
          <div className="mt-4 text-center text-gray-500">
            <Spinner aria-label="Loading" />
            <span className="ml-2">Verificando...</span>
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
        {success && (
          <div className="mt-4 text-green-500 text-center">
            Acceso concedido. Bienvenido, {formData.username}!
          </div>
        )}
      </div>
    </>
  );
}
