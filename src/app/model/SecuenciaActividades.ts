import { Actividad } from "./Actividad";

export class SecuenciaActividades {
  id: number;
  nombre: string;
  fechaGeneracion: string;
  idUsuarioRealizador: number;
  idTexto: number;
  idNivel: number;
  actividades: Actividad[];
}