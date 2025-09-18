---
publishDate: 2025-03-21T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/controladores-industriales-risc-v-personalizados
title: "Evaluación de controladores industriales RISC-V personalizados"
excerpt: "Lecciones al prototipar un controlador industrial basado en RISC-V, desde pruebas de determinismo hasta mantenibilidad a largo plazo."
image: '~/assets/images/industrial-automation.jpg'
category: Automatización Industrial
tags:
  - risc-v
  - sistemas embebidos
  - industrial
metadata:
  canonical: https://eduardovieira.dev/es/controladores-industriales-risc-v-personalizados
---

# Evaluación de controladores industriales RISC-V personalizados

Un cliente me pidió analizar si una plataforma RISC-V a medida podía sustituir controladores propietarios que ya estaban al final de su ciclo de vida en una línea de empaque especializada. Este es el marco de evaluación que utilizamos y los aprendizajes que dejó el prototipo.

## 1. Motivaciones del negocio

- **Presión de costos:** Las tarjetas de reemplazo del OEM superaban los USD 3,000 y tenían plazos de entrega de 16 semanas.
- **Flexibilidad:** El cliente ajusta recetas de máquina con frecuencia y buscaba una plataforma compatible con toolchains modernos (Git, CI/CD, despliegues en contenedores).
- **Apertura:** Evitar el bloqueo con proveedores y licenciamientos sorpresivos al escalar internacionalmente.

## 2. Criterios para elegir hardware

Analizamos tres SoM RISC-V con certificaciones de temperatura industrial:

| Tarjeta | CPU | Opciones de E/S | Certificación industrial | Notas |
| --- | --- | --- | --- | --- |
| Vendor A SoM | 4 núcleos RV64 | 2x Ethernet, 4x CAN, 1x PCIe | CE/UL en proceso | Excelente soporte del fabricante |
| Vendor B Module | Doble núcleo RV32 | EtherCAT, RS-485, E/S aisladas | CE/UL vigente | RAM limitada |
| Vendor C Dev Kit | 8 núcleos RV64 | Ethernet gigabit, USB, SPI | Ninguna | Gran rendimiento pero sin certificaciones |

Elegimos **Vendor B** para las pruebas piloto porque la E/S aislada integrada reducía el trabajo de PCB, aun cuando la memoria era ajustada.

## 3. Pila de software

- **RTOS:** Zephyr con el complemento de Time-Sensitive Networking (TSN) para Ethernet determinista.
- **Middleware:** FreeModbus, un maestro EtherCAT personalizado y un cliente MQTT ligero.
- **Capa de aplicación:** Texto estructurado convertido a C usando exportaciones PLCopen XML y compilado con GCC.
- **Herramientas:** Pipelines de GitLab CI que cruzan compilaciones, ejecutan análisis estático (cppcheck) y publican artefactos en un registro interno.

## 4. Determinismo y comportamiento en tiempo real

Instrumenté el firmware con toggles GPIO y medí el jitter con un osciloscopio digital. Resultados:

- **Tiempo de ciclo:** Tarea de 2 ms con jitter de ±60 µs bajo carga nominal.
- **Carga de red:** Al habilitar MQTT con QoS 1 el jitter subió a ±120 µs; lo mitigamos delegando MQTT a un segundo núcleo.
- **Latencia de interrupciones:** Máximo de 8 µs al manejar PDOs de EtherCAT; aceptable para los lazos de servos de la máquina.

## 5. Endurecimiento industrial

- **Gabinete:** Carrier para riel DIN con recubrimiento conformal para soportar humedad.
- **Alimentación:** Entradas duales redundantes de 24 VDC con protección de polaridad inversa.
- **Diagnóstico:** Consola UART dedicada para mantenimiento y bootloader seguro con actualización de firmware firmada.
- **Ciberseguridad:** Módulo TPM 2.0 para almacenamiento de llaves, TLS mutuo para MQTT y atestación remota integrada con Azure DPS.

## 6. Integración con la infraestructura existente

Para evitar reescribir el HMI expusimos el mismo conjunto de nodos OPC UA que usaba el controlador original. Una capa de traducción mapeó las etiquetas internas a variables OPC UA, de modo que el SCADA existente se conectó sin cambios.

## 7. Costo total de propiedad

| Concepto | RISC-V personalizado | Repuesto legado |
| --- | --- | --- |
| BOM de hardware | USD 620 | USD 3,050 |
| Desarrollo de firmware (estimado) | USD 45,000 | USD 0 (off-the-shelf) |
| Certificación | USD 12,000 | Incluida |
| Soporte anual | USD 6,000 | USD 18,000 |

El punto de equilibrio llegó en el tercer año al considerar repuestos y menor tiempo de inactividad. El beneficio intangible: control total del roadmap y capacidad de corregir vulnerabilidades en nuestro propio calendario.

## 8. Veredicto final

Los controladores RISC-V personalizados no son reemplazos directos para cualquier planta, pero brillan cuando:

- Necesitas combinaciones de E/S especializadas o redes deterministas.
- La organización está lista para tratar el firmware de control como software moderno con prácticas DevOps.
- El costo de ciclo de vida y la resiliencia de la cadena de suministro pesan más que la comodidad de los PLC comerciales.

Para una adopción amplia invierte temprano en documentación, pruebas automatizadas y capacitación para mantenimiento. Con esos pilares, RISC-V puede convertirse en un diferenciador competitivo en programas de automatización industrial.
