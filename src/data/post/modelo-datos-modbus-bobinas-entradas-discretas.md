---
publishDate: 2025-03-18T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/modelo-datos-modbus-bobinas-entradas-discretas
title: "Modelo de datos Modbus: bobinas y entradas discretas"
excerpt: "Cómo mapear y gestionar bobinas y entradas discretas en Modbus, incluyendo estrategias de antirrebote y diagnósticos."
image: '~/assets/images/modbus.jpg'
category: Automatización Industrial
tags:
  - modbus
  - modelo de datos
metadata:
  canonical: https://eduardovieira.dev/es/modelo-datos-modbus-bobinas-entradas-discretas
---

# Modelo de datos Modbus: bobinas y entradas discretas

Las señales digitales son la columna vertebral de la automatización Modbus. Al cablear sensores de seguridad o controlar solenoides, entender el comportamiento de bobinas y entradas discretas evita falsas alarmas y estados inesperados.

## 1. Definiciones

- **Bobinas (0xxxx):** Salidas de un bit que se pueden escribir, normalmente para relés o solenoides.
- **Entradas discretas (1xxxx):** Valores de un bit solo lectura, enlazados a sensores o enclavamientos.

## 2. Planificación de direcciones

Agrupa señales relacionadas para facilitar el escaneo y el diagnóstico:

| Rango | Uso sugerido |
| --- | --- |
| 00001–00016 | Salidas de seguridad (relés de paro, contactores) |
| 00017–00064 | Comandos de máquina (arranque, paro, jog) |
| 10001–10032 | Entradas de seguridad (cortinas, interruptores de puerta) |
| 10033–10100 | Sensores de proceso (niveles, proximidad) |

## 3. Antirrebote y filtrado

- Implementa lógica ladder o filtros en la pasarela para evitar que entradas ruidosas conmuten repetidamente.
- Usa temporizadores en texto estructurado o promedios móviles para sensores expuestos a vibración.
- Documenta tiempos de antirrebote para que analítica entienda la temporalidad de eventos.

## 4. Diagnóstico y monitoreo de salud

Supervisa el estado de la red digital:

- Cuenta transiciones por turno para detectar sensores en falla (demasiados cambios).
- Expone bits de diagnóstico que indiquen cortos o sobrecargas.
- Publica heartbeats desde circuitos de seguridad para verificar su integridad.

## 5. Ejemplo: lectura y escritura de bobinas en Python

```python
from pymodbus.client import ModbusTcpClient

client = ModbusTcpClient('192.168.1.50')

# Leer entradas discretas 10001–10016
inputs = client.read_discrete_inputs(address=0, count=16, unit=1)
print(inputs.bits)

# Activar la bobina 00005
client.write_coil(address=4, value=True, unit=1)
```

## 6. Gestión de alarmas

- Asigna niveles de severidad a cada bobina/entrada e intégralos con tu SCADA/CMMS.
- Crea máquinas de estados para detectar señales trabadas (por ejemplo, comando de arranque activo demasiado tiempo).
- Usa tópicos MQTT para difundir transiciones de alarma con marca de tiempo y confirmación del operador.

## 7. Checklist de puesta en marcha

1. Valida el cableado y rotula cada terminal claramente.
2. Prueba cada bobina/entrada a través del PLC/HMI antes de conectar sistemas superiores.
3. Registra tiempos de scan base para detectar problemas futuros de desempeño.
4. Documenta estados seguros para cada bobina en caso de pérdida de comunicación.

Bobinas y entradas discretas son solo un bit, pero sostienen la seguridad y desempeño de la máquina. Diseña, documenta y monitorea con cuidado para mantener la operación estable.
