---
publishDate: 2025-06-18T00:00:00Z
author: Eduardo Vieira
title: "Connecting Allen‑Bradley PLCs to the Cloud with pycomm3 and Node‑RED"
excerpt: "Extract and control Allen‑Bradley ControlLogix, CompactLogix, and Micro800 PLCs using EtherNet/IP and MQTT."
image: '~/assets/images/plc-allen-bradley.jpg'
category: IIoT
tags:
  - plc
  - allen-bradley
  - ethernet-ip
  - mqtt
metadata:
  canonical: https://eduardovieira.dev/conectando-plcs-allen-bradley-nube
---

# Connecting Allen‑Bradley PLCs to the Cloud with pycomm3 and Node‑RED

## Requirements
- Raspberry Pi with Python 3.7+, Docker, and Node‑RED.
- Allen‑Bradley PLC (ControlLogix, CompactLogix, or Micro800) accessible over EtherNet/IP.
- Python library `pycomm3` installed.
- MQTT broker available locally or in the cloud.

## EtherNet/IP and pycomm3 in Python
```python
from pycomm3 import LogixDriver
from paho.mqtt.client import Client

mqtt = Client()
mqtt.connect('broker.local', 1883)

# Connect to the PLC
with LogixDriver('192.168.0.50/1/0') as plc:
    # Read a tag
    tag_value = plc.read('Sensor_Temperatura')
    print(tag_value.value)
    mqtt.publish('plant/area1/ab/temperature', tag_value.value)

    # Write a tag
    plc.write('Setpoint', 75)
```

## Node‑RED Flows
1. Install the `node-red-contrib-cip-ethernet-ip` and MQTT nodes.
2. Configure the EtherNet/IP node with your PLC’s IP, slot, and path.
3. Design a flow that:
   - Reads tags and publishes them to MQTT topics.
   - Subscribes to MQTT commands and writes them to the PLC.

## Practical Project
- Extend your gateway to:
  - Monitor multiple PLC variables.
  - Control operations via MQTT (e.g., start/stop motors).
