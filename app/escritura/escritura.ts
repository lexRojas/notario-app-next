"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Instanciamos Prisma Client
const prisma = new PrismaClient();

export type ValorUsual = {
  id: bigint;
  escritura: number | null;
  folio_1: number | null;
  pag_1: string | null;
  folio_2: number | null;
  pag_2: string | null;
  fecha: Date | null;
  tomo: number | null;
  partes: string | null;
  hora: number | null;
  minutos: number | null;
  contrato: string | null;
  entero: string | null;
  firmas: number | null;
  lugar: string | null;
  tomo_registro: number | null;
  asiento: number | null;
};

export async function getData() {
  try {
    const result: ValorUsual[] = await prisma.valores_usuales.findMany({
      orderBy: {
        escritura: "desc",
      },
    });

    return {
      succesful: true,
      data: result,
      message: "Datos obtenidos correctamente",
    };
  } catch (error) {
    return { succesful: false, message: "Error al obtener los datos" + error };
  }
}

export async function insertValorUsual(data: {
  escritura: number;
  folio_1: number;
  pag_1: string;
  folio_2: number;
  pag_2: string;
  fecha: string;
  tomo: number;
  partes: string;
  hora: number;
  minutos: number;
  contrato: string;
  entero: string;
  firmas: number;
  lugar: string;
  tomo_registro: number;
  asiento: number;
}) {
  try {
    // Insertamos el nuevo valor_usual en la base de datos
    const result = await prisma.valores_usuales.create({
      data: {
        folio_1: Number(data.folio_1),
        pag_1: data.pag_1,
        folio_2: Number(data.folio_2),
        pag_2: data.pag_2,
        fecha: new Date(data.fecha),
        escritura: Number(data.escritura),
        tomo: Number(data.tomo),
        partes: data.partes,
        hora: Number(data.hora),
        minutos: Number(data.minutos),
        contrato: data.contrato,
        entero: data.entero,
        firmas: Number(data.firmas),
        lugar: data.lugar,
        tomo_registro: Number(data.tomo_registro),
        asiento: Number(data.asiento),
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

// Función para actualizar un registro existente
export async function updateValorUsual(data: {
  id: string;
  folio_1: number;
  pag_1: string;
  folio_2: number;
  pag_2: string;
  fecha: string;
  escritura: number;
  tomo: number;
  partes: string;
  hora: number;
  minutos: number;
  contrato: string;
  entero: string;
  firmas: number;
  lugar: string;
  tomo_registro: number;
  asiento: number;
}) {
  try {
    const result = await prisma.valores_usuales.update({
      where: {
        id: BigInt(data.id),
      },
      data: {
        folio_1: Number(data.folio_1),
        pag_1: data.pag_1,
        folio_2: Number(data.folio_2),
        pag_2: data.pag_2,
        fecha: new Date(data.fecha),
        escritura: Number(data.escritura),
        tomo: Number(data.tomo),
        partes: data.partes,
        hora: Number(data.hora),
        minutos: Number(data.minutos),
        contrato: data.contrato,
        entero: data.entero,
        firmas: Number(data.firmas),
        lugar: data.lugar,
        tomo_registro: Number(data.tomo_registro),
        asiento: Number(data.asiento),
      },
    });
    return result;
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    throw new Error("No se pudo actualizar el registro");
  } finally {
    await prisma.$disconnect();
  }
}

// Función para eliminar un registro existente
export async function deleteValorUsual(id: string) {
  try {
    const result = await prisma.valores_usuales.delete({
      where: {
        id: BigInt(id),
      },
    });
    return result;
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    throw new Error("No se pudo eliminar el registro");
  } finally {
    await prisma.$disconnect();
  }
}
