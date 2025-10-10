"use server";

import { ValorUsual } from "@/types/types";
import { PrismaClient } from "@prisma/client";

interface indiceTemplate {
  mensaje: string;
  quincena: string;
  mes: string;
  ano: number;
  notario: string;
  carnet: number;
  fecha: string;
  nota: string;
  data: {
    id: number;
    escritura: number | null;
    folio_1: number | null;
    pag_1: string | null;
    folio_2: number | null;
    pag_2: string | null;
    fecha: string | null;
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
  }[];
}

interface inputProps {
  quincena: string;
  mes: string;
  ano: number;
  notario: string;
  carnet: number;
  fecha: string;
  nota: string;
}

const obtenerFechasQuincena = (
  quincena: string,
  mes: string,
  ano: number,
): { inicio: string; fin: string } => {
  // Meses del año para convertir el nombre a número
  const meses: { [key: string]: number } = {
    enero: 1,
    febrero: 2,
    marzo: 3,
    abril: 4,
    mayo: 5,
    junio: 6,
    julio: 7,
    agosto: 8,
    septiembre: 9,
    octubre: 10,
    noviembre: 11,
    diciembre: 12,
  };

  // Convertir el mes a número
  const mesNumero = meses[mes];

  // Obtener el primer y último día del mes

  const ultimoDiaDelMes = new Date(ano, mesNumero, 0); // Último día del mes

  // Calcular la fecha de inicio y fin según la quincena
  let inicio, fin;

  if (quincena === "primera") {
    inicio = `${ano}-${String(mesNumero).padStart(2, "0")}-01`; // 1ro de mes
    fin = `${ano}-${String(mesNumero).padStart(2, "0")}-15`; // 15 de mes
  } else {
    inicio = `${ano}-${String(mesNumero).padStart(2, "0")}-16`; // 16 de mes
    fin = `${ano}-${String(mesNumero).padStart(2, "0")}-${ultimoDiaDelMes.getDate()}`; // Último día del mes
  }

  return { inicio, fin };
};

export const getIndice = async (
  values: inputProps,
): Promise<indiceTemplate | null> => {
  // Instanciamos Prisma Client
  const prisma = new PrismaClient();

  try {
    const { quincena, mes, ano, notario, carnet, fecha, nota } = values;

    const { inicio, fin } = obtenerFechasQuincena(quincena, mes, ano);

    console.log(inicio, fin);

    const data: ValorUsual[] = await prisma.valores_usuales.findMany({
      where: {
        fecha: {
          gte: inicio,
          lte: fin,
        },
      },

      orderBy: {
        escritura: "asc",
      },
    });

    let mensaje = "";

    if (data.length > 0) {
      mensaje = "-- ULTIMA LINEA --";
    } else {
      mensaje = "-- NO CARTULE ESTA QUINCENA -- / ULTIMA LINEA --";
    }

    const newData = data.map((item) => ({
      ...item,
      fecha: new Date(item.fecha!).toLocaleDateString("es-CR", {
        timeZone: "America/Costa_Rica",
      }),
    }));

    const result: indiceTemplate = {
      mensaje: mensaje,
      quincena: quincena,
      mes: mes,
      ano: ano,
      notario: notario,
      carnet: carnet,
      fecha: fecha,
      nota: nota,
      data: newData,
    };

    console.log(result);

    return result;
  } catch {
    return null; // Return null in case of an error
  } finally {
    await prisma.$disconnect();
  }
};
