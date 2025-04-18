---
publishDate: 2025-06-11T00:00:00Z
author: Eduardo Vieira
title: "Connecting Siemens PLCs to the Cloud with Snap7 and Node-RED"
excerpt: "Learn how to extract data from Siemens S7 PLCs and publish to the cloud using a Raspberry Pi-based gateway with Node-RED."
image: '~/assets/images/plc-siemens-s7.jpg'
category: IIoT
tags:
  - siemens
  - plc
  - snap7
  - node-red
  - mqtt
metadata:
  canonical: https://eduardovieira.dev/conectando-plcs-siemens-nube
---

Connecting Siemens PLCs to the Cloud with Snap7 and Node-RED

In this course, you’ll learn how to extract data from Siemens S7 PLCs and send it to the cloud using a Raspberry Pi-based gateway with Node-RED.

## Requirements

- Raspberry Pi with Docker, Node-RED, and Python 3.7+.
- Siemens PLC with Ethernet connectivity and network access.
- Python libraries `snap7` and `paho-mqtt`.
- Available MQTT broker (local or cloud).

## S7 Protocol and Addressing

- Data block (DB) structure and tags in Siemens S7.
- Addressing: DB#, offset, and data types (BOOL, INT, REAL).

## Reading/Writing with Snap7 in Python

```python
import snap7
from snap7.util import get_real, set_real
from paho.mqtt.client import Client

mqtt = Client()
mqtt.connect('broker.local', 1883)

plc = snap7.client.Client()
plc.connect('192.168.0.100', 0, 1)  # IP, rack, slot

# Leer DB1, offset=0, 4 bytes -> REAL
data = plc.db_read(1, 0, 4)
value = get_real(data, 0)
mqtt.publish('plant/area1/s7/temperature', value)

# Escribir REAL en DB1 offset=10
buff = bytearray(4)
set_real(buff, 0, 55.5)
plc.db_write(1, 10, buff)
```

## Node-RED Flows

1. Install S7 nodes (`node-red-contrib-s7`) and MQTT.
2. Configure PLC host (IP, rack, slot) in the S7 node.
3. Design a flow:
   - Read tags and publish to MQTT topics.
   - Subscribe to MQTT commands and write to the PLC.

## Practical Project

- Extend your gateway (Python or Node-RED) to:
  - Read multiple data blocks and publish metrics.
  - Control PLC variables via MQTT.
- Test with PLCSIM or real hardware.

