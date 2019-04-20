export interface Enlace {
  nombre: string;
  ruta: string;
  icono?: string;
  requiereSesion?: boolean; // Requiere inicio de sesión.
  restringido?: boolean;   // Requiere privilegios de administrador.
}
