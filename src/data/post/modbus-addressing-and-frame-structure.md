---
publishDate: 2025-03-30T00:00:00Z
author: Eduardo Vieira
title: "Understanding Modbus Addressing and Frame Structure"
excerpt: "A practical guide to decoding Modbus RTU and TCP frames, with tips for troubleshooting field deployments."
image: '~/assets/images/modbus.jpg'
category: Industrial Automation
tags:
  - modbus
  - protocol
metadata:
  canonical: https://eduardovieira.dev/modbus-addressing-and-frame-structure
---

# Understanding Modbus Addressing and Frame Structure

Whether you’re integrating legacy equipment or building a new IIoT gateway, mastering Modbus framing saves hours of troubleshooting. This guide breaks down the addressing model and how RTU/TCP frames are assembled in real projects.

## 1. Logical vs. Physical Addressing

Modbus addresses are zero-based, but many vendor manuals use one-based notation. Always confirm:

- **40001** (manual) equals holding register **address 0** in code.
- **Coils** (0xxxx), **discrete inputs** (1xxxx), **input registers** (3xxxx), **holding registers** (4xxxx).
- Unit identifiers matter on gateways bridging multiple devices.

## 2. RTU Frame Anatomy

```
| Address | Function | Data ... | CRC |
  1 byte    1 byte   N bytes   2 bytes
```

Example: Reading two holding registers from slave 0x11

```
Request: 11 03 00 6B 00 02 CRC
Response: 11 03 04 02 2B 00 00 CRC
```

Tips:

- Ensure **silent intervals** of 3.5 character times between frames.
- Match baud rate, parity, and stop bits across all nodes.
- Watch for CRC mismatches caused by noise; add shielding and proper grounding.

## 3. TCP Frame Anatomy

Modbus TCP wraps PDU data in an MBAP header:

```
| Transaction ID | Protocol ID | Length | Unit ID | Function | Data |
      2 bytes         2 bytes     2 bytes   1 byte    1 byte    N bytes
```

- Transaction ID helps match responses in asynchronous clients.
- Protocol ID is always `0x0000`.
- Length covers Unit ID + Function + Data.

## 4. Mapping Devices to Addresses

Create a register map spreadsheet that includes:

| Tag | Type | Address | Scaling | Units | Notes |
| --- | --- | --- | --- | --- | --- |
| Oven_Temp | Holding Register | 40010 | ÷10 | °C | PLC word |
| Valve_CMD | Coil | 00005 | — | BOOL | Write only |

Keep the map version-controlled and share it with OT/IT teams.

## 5. Troubleshooting Workflow

1. **Verify wiring** and termination resistors (120 Ω) on RS-485 networks.
2. **Use a protocol analyzer** (Modbus Poll, QModMaster, Wireshark) to inspect frames.
3. **Check diagnostics**: Many PLCs expose Modbus error counters (timeout, CRC, exception).
4. **Review exception codes** (e.g., `0x02` illegal data address) to adjust queries.

## 6. Sample Python Decoder

```python
from pymodbus.client import ModbusSerialClient

client = ModbusSerialClient(method="rtu", port="/dev/ttyUSB0", baudrate=9600)
result = client.read_holding_registers(address=0, count=2, unit=17)
if result.isError():
    print(result)
else:
    print(result.registers)
```

## 7. Best Practices for Field Deployments

- Group contiguous registers to reduce roundtrips.
- Avoid mixing slow and fast devices on the same RTU segment; use repeaters if necessary.
- Document and test fallback strategies when a device goes offline.
- Consider migrating to MQTT Sparkplug B for structured data while maintaining Modbus at the edge.

Understanding Modbus frames takes the guesswork out of commissioning and keeps data pipelines flowing smoothly.
