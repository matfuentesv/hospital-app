export interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  edad: string;
  direccion: string;
  telefono: string;
  alertaMensaje: string;
  alertaNivel: string;
  alertaFechaHora: string;
  frecuenciaCardiaca: number;
  presionArterialSistolica: number;
  presionArterialDiastolica: number;
  temperatura: number;
  senalVitalFechaHora: string;
}
