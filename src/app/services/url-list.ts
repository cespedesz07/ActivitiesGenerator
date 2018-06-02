import {environment} from '../../environments/environment'

const rootServer = environment.apiURL;

export const URL_LIST = {
  //Nivel
  nivelAll: `${rootServer}/nivel/all/`,
  textoByNivel: `${rootServer}/nivel/{0}/textos/`,

  //Actividad
  actividadAll: `${rootServer}/actividad/all/`,
  
  //SecuenciaActividades
  registrarSecuencia: `${rootServer}/secuencia/registrar/`,
  eliminarSecuencia: `${rootServer}/secuencia/{0}/eliminar/`,
  secuenciaAll: `${rootServer}/secuencia/all/`,
  secuenciaOne: `${rootServer}/secuencia/{0}/`,
  actividadesOfSecuencia: `${rootServer}/secuencia/{0}/actividades`,
  
  //Texto
  contenidoTexto: `${rootServer}/texto/{0}/contenido/`,

  //Nocion
  nocionOne: `${rootServer}/nocion/{0}`,

  //Lectura
  lecturaByNocion: `${rootServer}/nocion/{0}/lecturas`,
}