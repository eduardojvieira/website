---
publishDate: 2025-03-30T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/direccionamiento-estructura-trama-modbus
title: "Comprender el direccionamiento y la estructura de trama Modbus"
excerpt: "Guía práctica para decodificar tramas Modbus RTU y TCP, con consejos para resolver problemas en campo."
image: '~/assets/images/modbus.jpg'
category: Automatización Industrial
tags:
  - modbus
  - protocolo
metadata:
  canonical: https://eduardovieira.dev/es/direccionamiento-estructura-trama-modbus
---

# Comprender el direccionamiento y la estructura de trama Modbus

Al integrar equipos heredados o construir una pasarela IIoT, dominar el framing Modbus ahorra horas de diagnóstico. Esta guía explica el modelo de direccionamiento y cómo se ensamblan las tramas RTU/TCP en proyectos reales.

## 1. Direccionamiento lógico vs. físico

Las direcciones Modbus son base cero, pero muchos manuales del fabricante usan notación base uno. Confirma siempre:

- **40001** (manual) equivale al registro holding **dirección 0** en código.
- **Bobinas** (0xxxx), **entradas discretas** (1xxxx), **registros de entrada** (3xxxx), **registros holding** (4xxxx).
- El identificador de unidad importa en pasarelas que enlazan múltiples dispositivos.

## 2. Anatomía de una trama RTU

```
| Dirección | Función | Datos ... | CRC |
  1 byte     1 byte    N bytes    2 bytes
```

Ejemplo: lectura de dos registros holding del esclavo 0x11

```
Request: 11 03 00 6B 00 02 CRC
Response: 11 03 04 02 2B 00 00 CRC
```

Consejos:

- Respeta los **intervalos de silencio** de 3,5 tiempos de carácter entre tramas.
- Alinea baudrate, paridad y bits de parada en todos los nodos.
- Vigila errores de CRC por ruido; agrega blindaje y buena puesta a tierra.

## 3. Anatomía de una trama TCP

Modbus TCP encapsula los datos PDU en un encabezado MBAP:

```
| ID de transacción | ID de protocolo | Longitud | Unit ID | Función | Datos |
       2 bytes            2 bytes        2 bytes    1 byte    1 byte   N bytes
```

- El ID de transacción ayuda a casar respuestas en clientes asíncronos.
- El ID de protocolo siempre es `0x0000`.
- La longitud incluye Unit ID + Function + Data.

## 4. Mapeo de dispositivos a direcciones

Crea una hoja de cálculo con el mapa de registros que incluya:

| Tag | Tipo | Dirección | Escalado | Unidades | Notas |
| --- | --- | --- | --- | --- | --- |
| Oven_Temp | Holding Register | 40010 | ÷10 | °C | Palabra PLC |
| Valve_CMD | Coil | 00005 | — | BOOL | Solo escritura |

Mantén el mapa versionado y compártelo con equipos OT/IT.

## 5. Flujo de resolución de problemas

1. **Verifica cableado** y resistencias de terminación (120 Ω) en redes RS-485.
2. **Usa un analizador de protocolo** (Modbus Poll, QModMaster, Wireshark) para inspeccionar tramas.
3. **Revisa diagnósticos:** muchos PLC exponen contadores de errores Modbus (timeout, CRC, excepciones).
4. **Consulta códigos de excepción** (por ejemplo `0x02` dirección ilegal de datos) para ajustar consultas.

## 6. Decodificador Python de ejemplo

```python
import struct

EXCEPTION_CODES = {
    0x01: "Función ilegal",
    0x02: "Dirección de datos ilegal",
    0x03: "Valor de datos ilegal",
    0x04: "Falla del esclavo"
}


def parse_modbus_response(frame: bytes) -> dict:
    address, function = frame[0], frame[1]
    length = frame[2]
    data = frame[3:3 + length]
    crc = struct.unpack('<H', frame[-2:])[0]

    if function & 0x80:
        return {"address": address, "error": EXCEPTION_CODES.get(data[0], "Desconocido"), "crc": crc}

    return {
        "address": address,
        "function": function,
        "data": list(data),
        "crc": crc,
    }
```

## 7. Estrategias para plantas reales

- Implementa **pruebas automáticas** que validen mapas Modbus tras cambios de firmware.
- Documenta **retardos de comunicación** aceptables por celda; sirven para detectar congestión.
- Considera **gateways redundantes** cuando múltiples líneas dependen de la misma infraestructura Modbus.

Dominar el direccionamiento y las tramas de Modbus aporta tranquilidad a integradores y operadores. Con mapas claros, monitoreo y buenas prácticas de cableado, el protocolo sigue siendo un aliado confiable en la automatización moderna.
