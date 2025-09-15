---
publishDate: 2025-04-02T00:00:00Z
author: Eduardo Vieira
title: "Modbus Function Codes with Real-World Examples"
excerpt: "Understand the most common Modbus function codes and how to implement them safely in industrial applications."
image: '~/assets/images/modbus.jpg'
category: Industrial Automation
tags:
  - modbus
  - function codes
metadata:
  canonical: https://eduardovieira.dev/modbus-function-codes-examples
---

# Modbus Function Codes with Real-World Examples

Modbus function codes define what action a master requests from a slave device. These examples illustrate how I apply the most common codes when integrating PLCs, drives, and energy meters on the plant floor.

## 1. Read Coils (0x01)

- **Use case:** Polling motor start/stop commands or digital outputs.
- **Tip:** Group contiguous coils to minimize requests.

```python
client.read_coils(address=0, count=8, unit=1)
```

## 2. Read Discrete Inputs (0x02)

- **Use case:** Monitoring safety circuits (light curtains, door sensors).
- **Tip:** Use separate polling intervals for safety-critical signals to avoid delays.

```python
client.read_discrete_inputs(address=0, count=16, unit=1)
```

## 3. Read Holding Registers (0x03)

- **Use case:** Fetching process values, setpoints, counters.
- **Tip:** Apply scaling (divide/multiply) according to documentation.

```python
result = client.read_holding_registers(40010, count=4, unit=3)
temperature = result.registers[0] / 10
```

## 4. Read Input Registers (0x04)

- **Use case:** Reading sensor data or energy meter values that are read-only.

```python
client.read_input_registers(address=0, count=6, unit=5)
```

## 5. Write Single Coil (0x05)

- **Use case:** Start/stop commands, enabling outputs.
- **Tip:** Confirm the coil state in a follow-up read; some devices queue writes.

```python
client.write_coil(address=4, value=True, unit=1)
```

## 6. Write Single Register (0x06)

- **Use case:** Adjust setpoints or modes (e.g., speed reference for a drive).
- **Tip:** Validate ranges before writing to avoid trips.

```python
client.write_register(address=40020, value=1500, unit=2)
```

## 7. Write Multiple Coils (0x0F) and Registers (0x10)

- **Use case:** Downloading recipes, resetting counters, or switching multiple outputs simultaneously.
- **Tip:** Use this to guarantee all values change within the same transaction.

```python
client.write_coils(address=0, values=[True, False, True], unit=1)
client.write_registers(address=40030, values=[120, 250, 370], unit=2)
```

## 8. Diagnostics (0x08)

- **Use case:** Testing communication links or resetting diagnostic counters.

```python
client.diag_query(diag_code=0x0000, unit=1)  # return query data
```

## 9. Exception Codes to Watch

| Code | Meaning | Typical Fix |
| --- | --- | --- |
| 0x01 | Illegal function | Device doesn’t support the function |
| 0x02 | Illegal data address | Address outside range; adjust map |
| 0x03 | Illegal data value | Value out of range; check scaling |
| 0x06 | Slave device busy | Reduce polling or add delays |

## 10. Safety Considerations

- Always validate writes against safe operating ranges.
- Implement permissions in the edge gateway; not every user should write to Modbus devices.
- Log all write operations with operator ID and timestamp.

Mastering function codes is key to reliable Modbus integration. Pair these commands with thoughtful error handling and security controls to keep your systems robust.
