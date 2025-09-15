---
publishDate: 2025-03-15T00:00:00Z
author: Eduardo Vieira
title: "Building a Production-Ready IIoT Gateway with Raspberry Pi"
excerpt: "Turn a Raspberry Pi into a hardened IIoT gateway that securely bridges PLCs, sensors, and cloud analytics."
image: '~/assets/images/raspberry-pi.jpg'
category: IIoT
tags:
  - raspberry pi
  - iiot
  - gateway
metadata:
  canonical: https://eduardovieira.dev/gateway-iiot-raspberry-pi
---

# Building a Production-Ready IIoT Gateway with Raspberry Pi

I frequently deploy Raspberry Pi-based gateways as agile companions to traditional PLC systems. With the right design, they can handle industrial workloads reliably. This guide covers the blueprint I use from hardware selection to security hardening.

## 1. Hardware Foundation

- **Model:** Raspberry Pi 4/5 with 8 GB RAM for ample headroom.
- **Storage:** Industrial-grade microSD or, preferably, NVMe/SSD via USB 3.0.
- **Enclosure:** DIN-rail case with proper ventilation and optional heatsinks.
- **Power:** 24 VDC industrial PSU with surge suppression and UPS backup.

## 2. Operating System and Base Configuration

```bash
sudo raspi-config  # enable SSH, set locale/timezone, expand filesystem
sudo apt update && sudo apt upgrade
sudo apt install docker.io docker-compose fail2ban unattended-upgrades
```

- Disable unused interfaces (Bluetooth, Wi-Fi) if not required.
- Set static IPs on OT and IT VLANs using separate USB NICs.
- Configure systemd-journald to forward logs to a remote syslog server.

## 3. Containerized Services

```yaml
version: '3.8'
services:
  mqtt:
    image: eclipse-mosquitto:2
    volumes:
      - ./mosquitto:/mosquitto
    ports:
      - "8883:8883"
  node-red:
    image: nodered/node-red:latest
    volumes:
      - ./data/node-red:/data
    ports:
      - "1880:1880"
  collector:
    build: ./collector
    restart: always
```

- Keep containers lean and define resource limits (CPU shares, memory).
- Use Watchtower or CI/CD jobs for controlled updates.

## 4. Python Collector Skeleton

```python
import time, json
from pycomm3 import LogixDriver
from paho.mqtt.client import Client

TAGS = ["Machine.Temp", "Machine.State", "Machine.Alarm"]

client = Client(client_id="edge-gateway")
client.tls_set("ca.pem", "gateway.pem", "gateway.key")
client.connect("mqtt.company.com", 8883)

with LogixDriver("192.168.10.15/1") as plc:
    while True:
        values = {tag: LogixDriver(tag).value for tag in TAGS}
        payload = json.dumps({"ts": time.time(), "data": values})
        client.publish("plant/line1/plc", payload, qos=1)
        time.sleep(1)
```

Swap `pycomm3` for `pymodbus`, `snap7`, or any protocol client you need.

## 5. Security Hardening Checklist

- Enforce SSH key authentication and disable password logins.
- Implement firewall rules with `ufw` or `nftables`; allow only necessary ports.
- Use `fail2ban` to block brute-force attempts.
- Rotate certificates automatically using a secrets manager or cron job hitting a PKI API.

## 6. Observability

- Expose metrics through Prometheus Node Exporter and cAdvisor.
- Send logs to a central ELK/Graylog stack.
- Configure heartbeat topics to monitor gateway health (`/system/heartbeat`).

## 7. Maintenance and Lifecycle

- Keep a golden image with Ansible scripts to rebuild gateways quickly.
- Document procedures for swapping SD cards or hardware in case of failure.
- Schedule quarterly tests of UPS batteries and update cycles.

With disciplined engineering practices, Raspberry Pi gateways become reliable allies for IIoT initiatives—accelerating data capture, enabling remote visibility, and extending the reach of your PLC fleet.
