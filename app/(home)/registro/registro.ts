"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";

const prisma = new PrismaClient();

// Metodo para obtener Registros y Tarifarios
export async function obtenerDatosCompletos() {
  const registros = await prisma.registro.findMany({
    include: {
      // Incluir la relación con registro_acto
      registro_acto: {
        include: {
          // Incluir la relación con acto
          acto: true,
        },
      },
    },
  });

  // Para obtener también los datos de 'tarifario' y 'timbre' relacionados
  const tarifarios = await prisma.tarifario.findMany({
    include: {
      // Incluir la relación con acto
      acto: true,
      // Incluir la relación con timbre
      timbre: {
        include: {
          // Incluir la relación con el rango de timbre
          tarifario: true,
        },
      },
    },
  });

  // Puedes devolver un objeto que contenga ambas consultas
  return { registros, tarifarios };
}

// Metodo para insertar REGISTROS

export async function addRegistro(value: string) {
  try {
    const result = await prisma.registro.create({
      data: {
        registro_descripcion: value,
      },
    });

    return result;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Error conocido de Prisma
      console.error(
        `Error de Prisma (código: ${error.code}): ${error.message}`,
      );
      throw new Error(`Error de base de datos: ${error.message}`);
    } else {
      // Error desconocido
      console.error("Error desconocido al insertar el registro:", error);
      throw new Error(
        "Ocurrió un error inesperado. No se pudo insertar el registro.",
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}
