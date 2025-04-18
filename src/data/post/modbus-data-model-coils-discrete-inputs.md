---
publishDate: 2025-04-19T00:00:00Z
author: Eduardo Vieira
title: Modbus Data Model - Coils, Discrete Inputs, Holding Registers, Input Registers
excerpt: A deep dive into Modbus data types, addressing, and how to interact with coils, discrete inputs, and registers in your automation systems.
image: '~/assets/images/industrial-automation.jpg'
category: Industrial Automation
tags:
  - modbus
  - data model
metadata:
  canonical: https://eduardovieira.dev/modbus-data-model-coils-discrete-inputs
---

# Modbus Data Model: Coils, Discrete Inputs, Holding Registers, Input Registers

## Overview

Modbus defines four primary data types mapped to function codes:

| Data Type         | Function Codes   | Access       | Size    |
|-------------------|------------------|--------------|---------|
| Coils             | 1 (Read), 5, 15  | Read/Write   | 1 bit   |
| Discrete Inputs   | 2                | Read-only    | 1 bit   |
| Holding Registers | 3 (Read), 6, 16  | Read/Write   | 16 bits |
| Input Registers   | 4                | Read-only    | 16 bits |

## Coils (Discrete Outputs)

- Represent binary outputs such as relays, LEDs, and actuators.
- Operate with single-bit resolution.
- Function Code 1 reads coil status; 5 writes single coil; 15 writes multiple coils.

### Example: Reading Coils

```python
from pymodbus.client.sync import ModbusSerialClient
client = ModbusSerialClient(method='rtu', port='/dev/ttyUSB0', baudrate=9600)
result = client.read_coils(address=0, count=10, unit=1)
print(result.bits)
```

## Discrete Inputs (Binary Inputs)

- Represent binary inputs like switches or sensors.
- Function Code 2 reads discrete inputs.

## Holding Registers (Read/Write 16-bit)

- Store configuration parameters, setpoints, and control variables.
- Function Code 3 reads; 6 writes single register; 16 writes multiple registers.

### Example: Writing Multiple Registers

```python
from pymodbus.client.sync import ModbusTcpClient
client = ModbusTcpClient('192.168.0.10')
client.write_registers(address=10, values=[100, 200], unit=1)
```

## Input Registers (Read-only 16-bit)

- Represent sensor readings like temperature, pressure, or analog inputs.
- Function Code 4 reads input registers.

## Addressing

- Addresses start at 0 in Modbus frames but are often shown as 1-based in documentation.
- Use unit IDs to differentiate slave devices on a shared bus.

## Conclusion

Understanding the Modbus data model is foundational for effective industrial communication. Properly leveraging coils, discrete inputs, and registers enables robust control and monitoring in automation systems.
