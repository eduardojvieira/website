---
publishDate: 2025-03-18T00:00:00Z
author: Eduardo Vieira
title: "Modbus Data Model: Coils and Discrete Inputs"
excerpt: "Learn how to map and manage Modbus coils and discrete inputs, including debouncing strategies and diagnostics."
image: '~/assets/images/modbus.jpg'
category: Industrial Automation
tags:
  - modbus
  - data model
metadata:
  canonical: https://eduardovieira.dev/modbus-data-model-coils-discrete-inputs
---

# Modbus Data Model: Coils and Discrete Inputs

Digital signals are the backbone of Modbus automation. Whether you’re wiring safety sensors or controlling solenoids, understanding how coils and discrete inputs behave prevents false alarms and unexpected states.

## 1. Definitions

- **Coils (0xxxx):** Writable single-bit outputs, typically controlling relays or solenoids.
- **Discrete Inputs (1xxxx):** Read-only single-bit values, often tied to sensors or interlocks.

## 2. Address Planning

Group related signals to simplify polling and troubleshooting:

| Range | Example Use |
| --- | --- |
| 00001–00016 | Safety outputs (e-stop relays, contactors) |
| 00017–00064 | Machine commands (start, stop, jog) |
| 10001–10032 | Safety inputs (light curtains, door switches) |
| 10033–10100 | Process sensors (level switches, proximity sensors) |

## 3. Debouncing and Filtering

- Implement ladder logic or edge gateway filtering to prevent noisy inputs from toggling repeatedly.
- Use structured text timers or moving averages for sensors subject to vibration.
- Document debounce times so analytics teams understand event timing.

## 4. Diagnostics and Health Monitoring

Track the status of your digital network:

- Count transitions per shift to detect failing sensors (excessive toggling).
- Expose diagnostic bits indicating short circuits or overloads.
- Publish heartbeats from safety circuits to verify integrity.

## 5. Example: Reading and Writing Coils via Python

```python
from pymodbus.client import ModbusTcpClient

client = ModbusTcpClient('192.168.1.50')

# Read discrete inputs 10001–10016
inputs = client.read_discrete_inputs(address=0, count=16, unit=1)
print(inputs.bits)

# Set coil 00005 to TRUE
client.write_coil(address=4, value=True, unit=1)
```

## 6. Alarm Management

- Assign severity levels to each coil/input and integrate with your SCADA/CMMS.
- Create state machines to detect stuck signals (e.g., start command active too long).
- Use MQTT topics to broadcast alarm transitions with timestamp and operator acknowledgement.

## 7. Commissioning Checklist

1. Validate wiring and label each terminal clearly.
2. Test each coil/input through the PLC/HMI before connecting higher-level systems.
3. Record baseline scan times to detect future performance issues.
4. Document safe states for every coil in case of communication loss.

Coils and discrete inputs may be single bits, but they carry enormous responsibility for machine safety and performance. Treat their design, documentation, and monitoring with care to keep operations running smoothly.
