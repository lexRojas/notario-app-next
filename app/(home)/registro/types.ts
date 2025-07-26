type Acto = {
  id_acto: number;
  acto_descripcion: string | null;
  porcentaje_tarifa: number | null;
};

type RegistroActo = {
  registro_id_registro: number;
  acto_id_acto: number | null;
  acto: Acto | null;
};

type Registro = {
  id_registro: number;
  registro_descripcion: string | null;
  registro_acto: RegistroActo[];
};

type Timbre = {
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

type ActoTarifa = {
  id_tarifa: number;
  acto_id_acto: number | null;
  timbre_id_timbre: number | null;
  porcentaje: number;
  acto: Acto | null;
  timbre: Timbre | null;
};

type Tarifario = {
  id_tarifa: number;
  acto_id_acto: number | null;
  timbre_id_timbre: number | null;
  porcentaje: number;
};

export type JSONData = {
  registros: Registro[];
  tarifarios: ActoTarifa[];
};
