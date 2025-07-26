"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
