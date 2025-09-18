---
publishDate: 2025-03-15T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/gateway-iiot-raspberry-pi-produccion
title: "Construir una pasarela IIoT de nivel industrial con Raspberry Pi"
excerpt: "Convierte un Raspberry Pi en una pasarela IIoT robusta que una PLCs, sensores y analítica en la nube de forma segura."
image: '~/assets/images/raspberry-pi.jpg'
category: IIoT
tags:
  - raspberry pi
  - iiot
  - gateway industrial
metadata:
  canonical: https://eduardovieira.dev/es/gateway-iiot-raspberry-pi-produccion
---

# Construir una pasarela IIoT de nivel industrial con Raspberry Pi

Uso con frecuencia pasarelas basadas en Raspberry Pi como compañeras ágiles de los PLC tradicionales. Con el diseño adecuado pueden manejar cargas industriales de forma confiable. Esta guía resume el plano que sigo desde la selección de hardware hasta el endurecimiento de seguridad.

## 1. Base de hardware

- **Modelo:** Raspberry Pi 4/5 con 8 GB de RAM para tener margen suficiente.
- **Almacenamiento:** MicroSD grado industrial o, mejor, NVMe/SSD vía USB 3.0.
- **Gabinete:** Caja para riel DIN con ventilación adecuada y disipadores opcionales.
- **Alimentación:** Fuente industrial de 24 VDC con supresión de picos y respaldo UPS.

## 2. Sistema operativo y configuración inicial

```bash
sudo raspi-config  # habilita SSH, ajusta idioma/huso horario, expande el filesystem
sudo apt update && sudo apt upgrade
sudo apt install docker.io docker-compose fail2ban unattended-upgrades
```

- Deshabilita interfaces que no uses (Bluetooth, Wi-Fi).
- Asigna IPs estáticas en las VLAN OT e IT usando NICs USB separados.
- Configura systemd-journald para enviar logs a un servidor syslog remoto.

## 3. Servicios contenerizados

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

- Mantén los contenedores ligeros y define límites de recursos (CPU shares, memoria).
- Usa Watchtower o jobs de CI/CD para actualizaciones controladas.

## 4. Esqueleto de colector en Python

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

Sustituye `pycomm3` por `pymodbus`, `snap7` o cualquier cliente de protocolo que necesites.

## 5. Lista de endurecimiento de seguridad

- Obliga a usar claves SSH y deshabilita logins por contraseña.
- Implementa reglas de firewall con `ufw` o `nftables`; abre solo los puertos necesarios.
- Configura `fail2ban` para bloquear ataques de fuerza bruta.
- Rota certificados automáticamente con un gestor de secretos o un cron que consulte tu PKI.

## 6. Observabilidad

- Expón métricas con Prometheus Node Exporter y cAdvisor.
- Envía logs a un stack centralizado (ELK, Graylog).
- Configura tópicos de latido para supervisar la salud de la pasarela (`/sistema/latido`).

## 7. Mantenimiento y ciclo de vida

- Conserva una imagen dorada y scripts de Ansible para reconstruir pasarelas rápidamente.
- Documenta procedimientos para reemplazar tarjetas SD o hardware en caso de falla.
- Agenda pruebas trimestrales de baterías UPS y ciclos de actualización.

Con ingeniería disciplinada, las pasarelas Raspberry Pi se convierten en aliadas confiables para iniciativas IIoT: aceleran la captura de datos, habilitan visibilidad remota y amplían el alcance de tu flota de PLC.
