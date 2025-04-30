---
publishDate: 2025-04-30T00:00:00Z
author: Eduardo Vieira
title: "Connecting Mitsubishi and CODESYS PLCs to the Cloud (Modbus Focus)"
excerpt: "Learn how to link Mitsubishi PLCs and CODESYS projects using Modbus RTU/TCP with Node-RED and Python."
image: '~/assets/images/plc-mitsubishi.jpg'
category: IIoT
tags:
  - plc
  - mitsubishi
  - codesys
  - modbus
metadata:
  canonical: https://eduardovieira.dev/connecting-mitsubishi-plcs-modbus
---

# Connecting Mitsubishi and CODESYS PLCs to the Cloud (Modbus Focus)

In this course, we’ll show how to use Modbus RTU/TCP to link Mitsubishi PLCs and CODESYS projects to your IoT gateway.

## Requirements
- Raspberry Pi or PC with Python 3.7+, Docker, and Node-RED.
- Mitsubishi PLC with Modbus RTU or TCP support.
- CODESYS project exported with Modbus communication.
- Python libraries: `pymodbus`, `paho-mqtt`.

## Modbus Configuration
- For RTU: configure serial port (`/dev/ttyUSB0`) and parameters (baud rate, parity).
- For TCP: IP address, port 502, and unit ID.
- In CODESYS, add a Modbus Master or Slave channel depending on the role.

## Examples in Python
```python
from pymodbus.client.sync import ModbusSerialClient, ModbusTcpClient
from paho.mqtt.client import Client

# Initialize clients
rtu = ModbusSerialClient(method='rtu', port='/dev/ttyUSB0', baudrate=9600)
tcp = ModbusTcpClient('192.168.0.20')
mqtt = Client()
mqtt.connect('broker.local')

# Read Holding Registers
rr = tcp.read_holding_registers(100, 4, unit=1)
print(rr.registers)
# Publish to MQTT
mqtt.publish('plant/mitsubishi/data', rr.registers)
```

## Node-RED Flows
1. Install Modbus RTU/TCP and MQTT nodes.
2. Configure the PLC connection (serial or TCP).
3. Design a flow that:
   - Reads registers and publishes them to MQTT topics.
   - Receives MQTT commands and writes them to the PLC.

## Practical Project
- Develop a service that monitors multiple PLCs and consolidates data in InfluxDB.
- Create Grafana dashboards for real-time visualization.
