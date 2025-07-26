export type Acto = {
  id_acto: number;
  acto_descripcion: string | null;
  porcentaje_tarifa: number | null;
};

export type RegistroActo = {
  registro_id_registro: number;
  acto_id_acto: number | null;
  acto: Acto | null;
};

export type Registro = {
  id_registro: number;
  registro_descripcion: string | null;
  registro_acto: RegistroActo[];
};

export type Timbre = {
  id_timbre: number;
  timbre_descripcion: string | null;
  factor: string | null;
  minimo: number | null;
  multiplo: number | null;
  valor: number | null;
  codigo: number;
  timbre_id_rango_timbre: unknown;
  tarifario: Tarifario[];
};

export type ActoTarifa = {
  id_tarifa: number;
  acto_id_acto: number | null;
  timbre_id_timbre: number | null;
  porcentaje: number;
  acto: Acto | null;
  timbre: Timbre | null;
};

export type Tarifario = {
  id_tarifa: number;
  acto_id_acto: number | null;
  timbre_id_timbre: number | null;
  porcentaje: number;
};

export type JSONData = {
  registros: Registro[];
  tarifarios: ActoTarifa[];
};
