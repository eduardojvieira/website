---
publishDate: 2025-04-09T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/diseno-payloads-mqtt-iiot
title: "Diseñar formatos de payload MQTT para IIoT"
excerpt: "Cómo estructurar payloads MQTT útiles para operaciones, analítica y sistemas empresariales sin generar deuda técnica."
image: '~/assets/images/industrial-automation.jpg'
category: IIoT
tags:
  - mqtt
  - payloads
metadata:
  canonical: https://eduardovieira.dev/es/diseno-payloads-mqtt-iiot
---

# Diseñar formatos de payload MQTT para IIoT

MQTT facilita mover datos, pero el formato del payload define si los sistemas aguas abajo pueden aprovecharlos. Así diseño payloads que escalan entre operaciones, TI y analítica.

## 1. Elige la codificación adecuada

| Codificación | Ventajas | Desventajas | Úsalo cuando |
| --- | --- | --- | --- |
| JSON | Legible, tooling ubicuo | Payload más grande, parseo más lento | Telemetría general, dashboards |
| Binario (protobuf, MessagePack) | Compacto, rápido | Requiere gestión de esquemas | Enlaces con poco ancho de banda |
| CSV | Simple, bajo overhead | Tipos ambiguos, poca metadata | Integraciones heredadas |
| Sparkplug B | Estandarizado, con estado | Requiere clientes específicos | Brokers MQTT empresariales |

La mayoría de los proyectos inician con JSON por su legibilidad y evolucionan a Sparkplug B al escalar.

## 2. Define un contrato de datos

- Usa nombres de campos consistentes (snake_case o camelCase) y documéntalos.
- Incluye timestamps (`ISO 8601`), unidades y flags de calidad.
- Versiona los payloads (`schema_version`) para manejar cambios.

Ejemplo JSON:

```json
{
  "schema_version": "1.2",
  "asset": "linea01.envasadora",
  "timestamp": "2025-04-09T14:30:05Z",
  "process": {
    "oee": 0.87,
    "temperatura_c": 192.5,
    "presion_bar": 4.2
  },
  "alarms": [
    {"code": 102, "severity": "high", "message": "Puerta abierta"}
  ]
}
```

## 3. Soporta localización y unidades

- Estandariza unidades (preferentemente SI) y convierte en el borde si es necesario.
- Incluye catálogos de mensajes por idioma cuando los operadores hablan múltiples lenguas.

## 4. Maneja lotes y streaming

- Para señales de cambio rápido, envía actualizaciones incrementales solo con campos modificados.
- Para cargas históricas, empaqueta arreglos de mediciones con timestamps de inicio/fin.

## 5. Incluye calidad y metadata de origen

- Añade campos de `quality` (good, bad, uncertain) e intervalos de muestreo.
- Identifica la fuente (`plc_id`, `gateway_id`, versión de firmware) para trazabilidad.

## 6. Consideraciones de seguridad

- Firma los payloads o usa TLS con autenticación mutua.
- Evita incrustar secretos o credenciales dentro del payload.
- Cifra campos sensibles a nivel aplicación si lo exige la normativa.

## 7. Pruebas y validación

- Crea JSON Schemas o definiciones protobuf y valida mensajes en pipelines CI.
- Usa gemelos digitales o simuladores para reproducir payloads antes del despliegue.

## 8. Documentación y gobierno

- Mantén las definiciones en un repositorio compartido con registro de cambios.
- Comunica deprecaciones con anticipación y soporta esquemas duales durante la transición.

Un payload bien estructurado convierte a MQTT en la columna vertebral de la manufactura inteligente. Trátalo como un contrato de API y los equipos aguas abajo construirán sobre él con confianza.
