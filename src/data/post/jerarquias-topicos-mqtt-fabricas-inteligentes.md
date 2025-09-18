---
publishDate: 2025-04-14T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/jerarquias-topicos-mqtt-fabricas-inteligentes
title: "Diseñar jerarquías de tópicos MQTT para fábricas inteligentes"
excerpt: "Estructura los tópicos MQTT para mantener datos organizados, seguros y escalables entre plantas, líneas y aplicaciones."
image: '~/assets/images/industrial-automation.jpg'
category: IIoT
tags:
  - mqtt
  - tópicos
metadata:
  canonical: https://eduardovieira.dev/es/jerarquias-topicos-mqtt-fabricas-inteligentes
---

# Diseñar jerarquías de tópicos MQTT para fábricas inteligentes

Una jerarquía bien pensada convierte a MQTT en la columna vertebral de los datos industriales. Un diseño pobre genera confusión y riesgos de seguridad. Estas son las convenciones que utilizo en despliegues multi-sitio.

## 1. Define un estándar de nombres

El formato que suelo adoptar es:

```
<region>/<planta>/<area>/<linea>/<activo>/<contexto>
```

Ejemplo: `na/mx-mty/empaque/linea01/taponadora/proceso/torque`

## 2. Separa dominios de datos

- `proceso` para telemetría y KPIs.
- `alarmas` para eventos que requieren acción humana.
- `comandos` para instrucciones de control.
- `_sys` para salud y diagnósticos.

Mantener dominios separados simplifica el control de acceso y el filtrado.

## 3. Usa comodines con estrategia

- `+` coincide con un nivel; `#` con todos los niveles restantes.
- Asigna permisos con comodines; por ejemplo, mantenimiento lee `na/+/+/+/+/proceso/#` pero solo escribe en tópicos de comandos específicos.

## 4. Versionado y cambios de esquema

- Incluye `v1`, `v2` en la jerarquía cuando cambia la estructura del payload.
- Soporta tópicos duales durante la migración para no romper consumidores.

## 5. Consideraciones multilingües

- Usa inglés en los nombres de tópico para mantener consistencia global.
- Proporciona campos localizados en el payload en lugar de duplicar tópicos.

## 6. Mapa de tópicos de ejemplo

| Tópico | Propósito |
| --- | --- |
| `na/mx-mty/empaque/linea01/taponadora/proceso/oee` | Métricas OEE |
| `na/mx-mty/empaque/linea01/taponadora/alarmas/alto_torque` | Notificaciones de alarma |
| `na/mx-mty/empaque/linea01/taponadora/comandos/ajustar_velocidad` | Tópico de comando |
| `na/mx-mty/empaque/linea01/taponadora/_sys/heartbeat` | Latido del gateway |

## 7. Seguridad y gobierno

- Implementa ACL que relacionen roles de usuario con patrones de tópicos.
- Documenta la propiedad de cada namespace para saber quién mantiene cada segmento.
- Audita suscripciones y publicaciones con regularidad para detectar anomalías.

## 8. Escalar entre sitios

- Reserva el primer nivel para región o unidad de negocio y evitar colisiones (`na`, `latam`, `emea`).
- Usa identificadores de línea y activo consistentes entre MES, CMMS y MQTT para facilitar la correlación.

Las jerarquías MQTT son más que nomenclatura: son la base de un ecosistema IIoT gestionable y seguro. Invertir tiempo en diseñarlas bien vuelve cada integración mucho más sencilla.
