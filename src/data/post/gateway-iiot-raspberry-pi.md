---
publishDate: 2025-06-04T00:00:00Z
author: Eduardo Vieira
title: "IIoT Gateway with Raspberry Pi – Bridging Protocols"
excerpt: "Use a Raspberry Pi with Node-RED and Python to translate industrial Modbus protocols to MQTT and vice versa."
image: '~/assets/images/rpi-gateway.jpg'
category: IIoT
tags:
  - gateway
  - raspberry-pi
  - node-red
  - mqtt
  - modbus
metadata:
  canonical: https://eduardovieira.dev/gateway-iiot-raspberry-pi
---

# IIoT Gateway with Raspberry Pi – Bridging Protocols

In this course, you’ll learn how to turn a Raspberry Pi into an IIoT gateway capable of translating Modbus data to MQTT and vice versa.

## Requirements
- Raspberry Pi with Raspbian Lite (SSH enabled), Docker, and Node-RED.
- Python 3.7+ with `pymodbus` and `paho-mqtt`.

## Installing Node-RED
```bash
docker run -d --name nodered -p 1880:1880 nodered/node-red
```
Access `http://<RPi-IP>:1880` to design flows.

## Creating Modbus → MQTT Flows
1. Add Modbus (read/write) and MQTT nodes in Node-RED.
2. Configure the Modbus host (IP/serial) and the MQTT broker.
3. Design a flow that:
   - Reads registers from a Modbus simulator and publishes every X seconds to an MQTT topic.
   - Receives MQTT commands and writes them to the Modbus device.

## Python Gateway (`gateway.py`)
```python
from pymodbus.client.sync import ModbusTcpClient
from paho.mqtt.client import Client

# Configuration
tcp = ModbusTcpClient('192.168.0.20')
mqtt = Client()
mqtt.connect('broker.local')

# MQTT callback
def on_message(client, userdata, msg):
    # Parse payload and write to Modbus
    tcp.write_register(10, int(msg.payload))

mqtt.on_message = on_message
mqtt.subscribe('plant/area1/command')

# Main loop
while True:
    rr = tcp.read_holding_registers(0, 5)
    mqtt.publish('plant/area1/data', rr.registers)
    mqtt.loop()
```

## Deployment with Systemd
```ini
[Unit]
Description=IIoT Gateway Service
After=network.target

[Service]
ExecStart=/usr/bin/python3 /home/pi/gateway.py
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```
Enable and start:
```bash
sudo systemctl enable gateway.service
sudo systemctl start gateway.service
```

## Security
- Configure UFW to restrict ports (1880, 502, 1883).
- Use TLS on the MQTT broker and in Python (`mqtt.tls_set()`).
- Limit access via ACLs in Node-RED.

---

In the next post, we’ll connect Siemens S7 PLCs to the cloud using this gateway.
