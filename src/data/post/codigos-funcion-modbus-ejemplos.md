---
publishDate: 2025-04-02T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/codigos-funcion-modbus-ejemplos
title: "Códigos de función Modbus con ejemplos reales"
excerpt: "Comprende los códigos Modbus más comunes y cómo implementarlos con seguridad en aplicaciones industriales."
image: '~/assets/images/modbus.jpg'
category: Automatización Industrial
tags:
  - modbus
  - códigos de función
metadata:
  canonical: https://eduardovieira.dev/es/codigos-funcion-modbus-ejemplos
---

# Códigos de función Modbus con ejemplos reales

Los códigos de función Modbus definen la acción que solicita un maestro al dispositivo esclavo. Estos ejemplos muestran cómo aplico los códigos más comunes al integrar PLC, drives y medidores de energía en planta.

## 1. Leer bobinas (0x01)

- **Caso de uso:** Consultar comandos de arranque/parada o salidas digitales.
- **Consejo:** Agrupa bobinas contiguas para minimizar solicitudes.

```python
client.read_coils(address=0, count=8, unit=1)
```

## 2. Leer entradas discretas (0x02)

- **Caso de uso:** Monitorear circuitos de seguridad (cortinas, puertas).
- **Consejo:** Usa intervalos de sondeo separados para señales críticas y evitar demoras.

```python
client.read_discrete_inputs(address=0, count=16, unit=1)
```

## 3. Leer registros holding (0x03)

- **Caso de uso:** Obtener valores de proceso, setpoints, contadores.
- **Consejo:** Aplica escalado según la documentación.

```python
result = client.read_holding_registers(40010, count=4, unit=3)
temperature = result.registers[0] / 10
```

## 4. Leer registros de entrada (0x04)

- **Caso de uso:** Leer datos de sensores o medidores de energía de solo lectura.

```python
client.read_input_registers(address=0, count=6, unit=5)
```

## 5. Escribir una bobina (0x05)

- **Caso de uso:** Comandos de inicio/paro o habilitar salidas.
- **Consejo:** Confirma el estado con una lectura posterior; algunos equipos encolan escrituras.

```python
client.write_coil(address=4, value=True, unit=1)
```

## 6. Escribir un registro (0x06)

- **Caso de uso:** Ajustar setpoints o modos (p. ej., referencia de velocidad de un drive).
- **Consejo:** Valida rangos antes de escribir para evitar disparos.

```python
client.write_register(address=40020, value=1500, unit=2)
```

## 7. Escribir múltiples bobinas (0x0F) y registros (0x10)

- **Caso de uso:** Descargar recetas, reiniciar contadores o conmutar múltiples salidas en simultáneo.
- **Consejo:** Usa estos códigos para garantizar que todos los valores cambien en la misma transacción.

```python
client.write_coils(address=0, values=[True, False, True], unit=1)
client.write_registers(address=40030, values=[120, 250, 370], unit=2)
```

## 8. Diagnóstico (0x08)

- **Caso de uso:** Probar enlaces de comunicación o reiniciar contadores diagnósticos.

```python
client.diag_query(diag_code=0x0000, unit=1)  # devuelve los datos de la consulta
```

## 9. Códigos de excepción a vigilar

| Código | Significado | Acción típica |
| --- | --- | --- |
| 0x01 | Función ilegal | El dispositivo no soporta la función |
| 0x02 | Dirección de datos ilegal | Dirección fuera de rango; ajusta el mapa |
| 0x03 | Valor de datos ilegal | Valor fuera de rango; revisa el escalado |
| 0x06 | Dispositivo ocupado | Reduce el sondeo o agrega retardos |

## 10. Consideraciones de seguridad

- Valida cada escritura contra rangos seguros de operación.
- Implementa permisos en la pasarela; no todos los usuarios deben escribir en equipos Modbus.
- Registra todas las escrituras con ID de operador y marca de tiempo.

Dominar los códigos de función es clave para integrar Modbus con confiabilidad. Complementa estos comandos con manejo de errores y controles de seguridad para mantener sistemas robustos.
