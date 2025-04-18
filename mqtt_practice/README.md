# MQTT Practice

Este proyecto demuestra la configuración de brokers MQTT con Docker y clientes simples en Python para publicar y suscribir datos IIoT.

## Archivos

- `docker-compose.yml`: Configura brokers Mosquitto y EMQX.
- `publish.py`: Publicador de datos de ejemplo.
- `subscribe.py`: Suscriptor a topics MQTT.
- `requirements.txt`: Dependencias Python.

## Requisitos

- Docker y Docker Compose
- Python 3.7+

## Instrucciones

1. Arrancar los brokers:
   ```bash
   docker-compose up -d
   ```
2. Instalar dependencias Python:
   ```bash
   pip install -r requirements.txt
   ```
3. Ejecutar el publicador:
   ```bash
   python publish.py --host localhost --port 1883 --topic planta/area1/sensor
   ```
4. Ejecutar el suscriptor:
   ```bash
   python subscribe.py --host localhost --port 1883 --topic planta/area1/sensor
   ```
