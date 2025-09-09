
export interface RegistroSensor {
  barco: string;
  sensor: string;
  registros: { timestamp: string; value: number }[];
}

// Función para generar valores random por tipo de sensor
function generarValorRandom(sensor: string): number {
  switch (sensor) {
    case 'Motor': return Math.floor(Math.random() * 20) + 60;      // 60-80 °C
    case 'Caldera': return Math.floor(Math.random() * 20) + 50;    // 50-70 °C
    case 'Helices': return Math.floor(Math.random() * 20) + 30;    // 30-50 RPM
    case 'Voltaje': return Math.floor(Math.random() * 20) + 210;   // 210-230 KW
    default: return Math.floor(Math.random() * 100);
  }
}

// Lista de barcos y sensores
const barcos = ['Rap H', 'Makenita', 'Helena H', 'Estefania H', 'San San H'];
const sensores = ['Motor', 'Caldera', 'Helices', 'Voltaje'];

// Crear registros con tiempo real
export const MOCK_SENSORS: RegistroSensor[] = [];

barcos.forEach(barco => {
  sensores.forEach(sensor => {
    const registros = [];
    const now = new Date();

    // Creamos 10 registros hacia atrás, 1 minuto cada uno
    for (let i = 9; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60 * 1000); // i minutos atrás
      registros.push({
        timestamp: timestamp.toLocaleTimeString(),
        value: generarValorRandom(sensor)
      });
    }

    MOCK_SENSORS.push({
      barco,
      sensor,
      registros
    });
  });
});
