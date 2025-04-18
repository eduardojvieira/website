# Gateway Practice

Este proyecto muestra cómo unir Modbus TCP y MQTT en una Raspberry Pi usando Node-RED o un script Python.

## Archivos

- `flows.json`: Flujo Node-RED para Modbus <-> MQTT.
- `gateway.py`: Script Python como servicio que lee registros Modbus y publica en MQTT, y escucha comandos MQTT para escribir en Modbus.
- `Dockerfile`: Define imagen Docker para ejecutar `gateway.py`.

## Requisitos

- Node-RED con nodos `node-red-contrib-modbus` y `node-red-node-mqtt` (para usar `flows.json`).
- Python 3.7+, librerías `pymodbus` y `paho-mqtt`.

## Uso como servicio Python

```bash
# instalar dependencias
pip install pymodbus paho-mqtt

# ejecutar gateway directamente
env MODBUS_HOST=127.0.0.1 MODBUS_PORT=502 \
    MQTT_HOST=127.0.0.1 MQTT_PORT=1883 \
    python gateway.py --unit 1 --read-address 0 --read-qty 2 \
    --interval 5 --topic-data planta/area1/sensor \
    --topic-cmd planta/area1/command
```

## Docker

```bash
docker build -t gateway_practice .
docker run --env MODBUS_HOST=... --env ... gateway_practice
```
