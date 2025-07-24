/**
 *
 *
 * @returns  DD-MM-YYYY (string)
 */
export function getToday(): string {
  const fecha = convertDateToYYYYMMDD(new Date());

  if (fecha) {
    const yy = fecha.split("-")[0];
    const mm = fecha.split("-")[1].padStart(2, "0");
    const dd = fecha.split("-")[2].padStart(2, "0");

    // Formatear la fecha en el formato 'dd-mm-YYYY'
    const fechaFormateada = `${dd}-${mm}-${yy}`;

    return fechaFormateada;
  } else {
    return "00-00-0000";
  }
}

/**
 *
 * @param fecha -> YYYY-MM-DD tipo String
 * @returns  DD-MM-YYYY (string)
 */
export function getFormateDate(fecha: string): string {
  if (fecha) {
    const yy = fecha.split("-")[0];
    const mm = fecha.split("-")[1].padStart(2, "0");
    const dd = fecha.split("-")[2].padStart(2, "0");

    // Formatear la fecha en el formato 'dd-mm-YYYY'
    const fechaFormateada = `${dd}-${mm}-${yy}`;

    return fechaFormateada;
  } else {
    return "00-00-0000";
  }
}

/**
 *
 * @param hora_inicio
 * @param hora_final
 * @returns diferencia de tiempo
 */
export function calcularDiferenciaEnHoras(
  hora_inicio: string,
  hora_final: string,
): number {
  const [hh_inicio, mm_inicio] = hora_inicio.split(":"); // Separa la hora y los minutos
  const [hh_final, mm_final] = hora_final.split(":"); // Separa la hora y los minutos

  const hh_inicio_num = Number.parseInt(hh_inicio);
  const mm_inicio_num = Number.parseInt(mm_inicio);

  const hh_final_num = Number.parseInt(hh_final);
  const mm_final_num = Number.parseInt(mm_final);

  const resultado =
    (hh_final_num * 60 + mm_final_num - (hh_inicio_num * 60 + mm_inicio_num)) /
    60;

  return resultado;
}

/**
 *
 * @param date
 * @returns 05-ene  formato dd-MM
 */
export function formatDateDDMM(date: string): string {
  const day = date.split("-")[2].padStart(2, "0");
  const mes = parseInt(date.split("-")[1]);
  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const month = monthNames[mes - 1]; // Obtiene el nombre del mes

  return `${day}-${month}`;
}

/**
 *
 * @param fecha YYYY-MM-DD
 * @returns DATE
 */
export function convertDateFromString(fecha: string): Date {
  const yy = parseInt(fecha.split("-")[0]);
  const mm = parseInt(fecha.split("-")[1]) - 1;
  const dd = parseInt(fecha.split("-")[2]);

  // Formatear la fecha en el formato 'dd-mm-YYYY'
  const fechaFormateada = new Date(yy, mm, dd);

  return fechaFormateada;
}

/**
 *
 * @param fecha en formato Date
 * @returns  retorna un string YYYY-MM-DD
 */
export function convertDateToYYYYMMDD(fecha: Date): string {
  const mi_fecha = new Date(fecha);

  // Obtener el día, mes y año
  const dia = String(mi_fecha.getDate()).padStart(2, "0"); // Asegura que el día tenga dos dígitos
  const mes = String(mi_fecha.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-11, por eso sumamos 1
  const anio = mi_fecha.getFullYear();

  // Formatear la fecha en el formato 'YYY-mm-dd'
  const fechaFormateada = `${anio}-${mes}-${dia}`;

  return fechaFormateada;
}

/**
 *
 * @param fecha String-> dd-mm-yyyy
 * @returns Date
 */
export function dateFromISOString(fecha: string): Date {
  // Obtener el día, mes y año

  const dia = parseInt(fecha.split("-")[2]);
  const mes = parseInt(fecha.split("-")[1]) - 1;
  const anio = parseInt(fecha.split("-")[0]);

  // Formatear la fecha en el formato 'dd-mm-YYYY'
  const fechaFormateada = new Date(anio, mes, dia);

  return fechaFormateada;
}

/**
 *
 * @param fecha1
 * @param fecha2
 * @returns numero de dias entre fechas
 */
export function daysBeetwenDates(fecha1: string, fecha2: string): number {
  const date1 = new Date(fecha1);
  const date2 = new Date(fecha2);

  // Obtener la diferencia en milisegundos
  const diferencia = date2.getTime() - date1.getTime();

  // Convertir la diferencia a días (1 día = 86400000 ms)
  const dias = diferencia / (1000 * 3600 * 24);

  return dias; // Resultado: 9
}

export function calcularDiferenciaFechas(
  fecha_inicio: string,
  fecha_final: string,
): { years: number; months: number; days: number } {
  let years =
    parseInt(fecha_final.split("-")[0]) - parseInt(fecha_inicio.split("-")[0]);
  let months =
    parseInt(fecha_final.split("-")[1]) - parseInt(fecha_inicio.split("-")[1]);
  let days =
    parseInt(fecha_final.split("-")[2]) - parseInt(fecha_inicio.split("-")[2]);

  // Ajustar los años y meses si es necesario
  if (months < 0) {
    years--;
    months += 12;
  }

  // Ajustar los días si es necesario
  if (days < 0) {
    months--;
    const lastMonth = new Date(
      parseInt(fecha_final.split("-")[0]),
      parseInt(fecha_final.split("-")[1]),
      0,
    );
    days += lastMonth.getDate(); // Obtiene el número de días del mes anterior
  }

  return { years, months, days };
}

export function getLastMonthDay(mes: number, year: number): number {
  console.log(year, mes);
  const dia = 0;
  const lastMonth: Date = new Date(year, mes, dia);

  return lastMonth.getDate();
}
