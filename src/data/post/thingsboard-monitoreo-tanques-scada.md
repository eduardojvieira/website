---
publishDate: 2025-05-09T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/thingsboard-monitoreo-tanques-scada
title: "Cómo construir un SCADA de monitoreo de tanques con ThingsBoard"
excerpt: "Enfoque paso a paso para modelar tanques, configurar telemetría y entregar dashboards operativos con ThingsBoard."
image: '~/assets/images/thingsboard.jpg'
category: IIoT
tags:
  - thingsboard
  - scada
metadata:
  canonical: https://eduardovieira.dev/es/thingsboard-monitoreo-tanques-scada
---

# Cómo construir un SCADA de monitoreo de tanques con ThingsBoard

Monitorear tanques de almacenamiento requiere instrumentación confiable, dashboards intuitivos y alarmas robustas. Así construyo una solución basada en ThingsBoard que los equipos de operaciones confían.

## 1. Instrumentación y captura de datos

- Conecta transmisores de nivel y sondas de temperatura a PLCs o dispositivos de borde.
- Publica telemetría en ThingsBoard vía MQTT o HTTP usando payloads JSON:

```json
{
  "tank_id": "TK-104",
  "level_percent": 78.2,
  "temperature_c": 42.5,
  "volume_liters": 35000,
  "timestamp": "2025-05-09T12:45:00Z"
}
```

## 2. Jerarquía de activos

- Crea un activo por instalación y define entidades de tanque con atributos (capacidad, tipo de producto, rangos seguros).
- Guarda contactos de mantenimiento y calendarios de inspección como atributos del lado del servidor.

## 3. Diseño del dashboard

- Combina indicadores de nivel, gráficos de tendencia y tablas de alarmas.
- Añade planos de planta con overlays que muestren el estado del tanque de un vistazo.
- Ofrece filtros rápidos (por producto, rango de temperatura) para que los operadores encuentren problemas al instante.

## 4. Configuración de alarmas

- Establece umbrales para niveles altos/bajos, cambios rápidos y desviaciones de temperatura.
- Configura la escalación: primero notifica a operadores, luego a mantenimiento si no se resuelve.
- Registra confirmaciones y notas de resolución directamente en ThingsBoard.

## 5. Reportes y analítica

- Usa widgets para calcular el tiempo dentro de rangos óptimos.
- Exporta telemetría a data lakes para pronósticos y conciliación de inventario.
- Programa reportes PDF automáticos para el relevo de turno diario.

## 6. Acceso móvil y seguridad

- Habilita dashboards responsivos para tabletas y smartphones usados en planta.
- Implementa control de acceso basado en roles para que solo personal autorizado confirme alarmas o cambie consignas.
- Utiliza certificados TLS y SSO para autenticación segura.

## 7. Integración con operaciones

- Envía órdenes de trabajo al CMMS cuando los niveles crucen umbrales críticos.
- Comparte datos con sistemas ERP para apoyar la planificación de producción.
- Proporciona APIs para que socios logísticos consulten el estado de inventario de forma segura.

Con una base de instrumentación sólida y una configuración cuidadosa de ThingsBoard, el monitoreo de tanques se vuelve proactivo en lugar de reactivo. Los operadores obtienen visibilidad en tiempo real e insights accionables para mantener la producción fluyendo sin contratiempos.
