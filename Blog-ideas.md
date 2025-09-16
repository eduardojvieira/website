**Ideas para Series de Blogs ("Cursos") sobre IIoT: Conectando la Planta a la Nube**

## CURSO 1: Fundamentos de Comunicación Industrial - Modbus Desmitificado

- **Objetivo:** Entender el protocolo industrial más ubicuo.
- **Contenido:**
  - ¿Qué es Modbus? Historia y relevancia actual.
  - Modbus RTU (Serial RS485/RS232) vs. Modbus TCP (Ethernet).
  - Modelo de Datos: Coils, Discrete Inputs, Holding Registers, Input Registers.
  - Todas las funciones de Modbus con ejemplos.
  - Direccionamiento y Tramas de Datos (RTU vs TCP).
  - **Seguridad:** ¿Por qué Modbus es inherentemente inseguro y consideraciones iniciales?
- **Proyecto Práctico:**
  - Crear un **Simulador Modbus TCP y RTU** simple en Python (para actuar como un dispositivo).
  - Crear un **Cliente Modbus TCP/RTU** en Python para leer/escribir datos en el simulador.
  - Usar un adaptador USB-RS485 para un **Sniffer/Logger Modbus RTU** básico en Python/Raspberry Pi.
- **GitHub:** Carpeta `modbus_practice` con `simulator.py`, `client.py`, `rtu_sniffer.py`, `requirements.txt` y `README.md`.

## CURSO 2: MQTT - El Lenguaje de la IIoT Moderna

- **Objetivo:** Dominar el protocolo clave para la comunicación IIoT.
- **Contenido:**
  - ¿Por qué MQTT? Principios: Publicar/Suscribir, Broker, Clientes.
  - Topics: Diseño de jerarquías efectivas para IIoT (ej. `planta/area/maquina/sensor`).
  - Calidad de Servicio (QoS 0, 1, 2): Cuándo usar cada uno.
  - Payloads: JSON como estándar de facto.
  - MQTT v3.1.1 vs v5: Diferencias clave (User Properties, Shared Subscriptions, etc.).
  - **Seguridad:** Conexiones seguras (TLS/SSL), Autenticación (Usuario/Pass, Certificados), Autorización (ACLs).
- **Proyecto Práctico:**
  - Instalar y configurar un Broker MQTT Mosquitto usando **Docker**.
  - Instalar y configurar un Broker MQTT EMQX usando **Docker**.
  - Crear Clientes MQTT simples en Python para publicar datos simulados y suscribirse a topics.
  - Configurar TLS y autenticación básica en el broker.
- **GitHub:** Carpeta `mqtt_practice` con `docker-compose.yml`, `publish.py`, `subscribe.py`, `requirements.txt` y ejemplos de configuración TLS/ACL.

## CURSO 3: El Gateway IIoT con Raspberry Pi - Puenteando Mundos

- **Objetivo:** Usar una Raspberry Pi como traductor entre protocolos industriales y MQTT.
- **Contenido:**
  - Preparación de la Raspberry Pi: OS Lite, SSH, Docker y Node-RED.
  - Instalación de nodos Modbus y MQTT en Node-RED.
  - Desarrollo de puente en Python usando `pymodbus` y `paho-mqtt`.
  - Orquestación del servicio con `systemd`.
  - **Seguridad:** Firewall (UFW), TLS y gestión de accesos.
- **Proyecto Práctico:**
  - Crear flujo Node-RED que:
    - Lea registros Modbus del simulador y los publique en MQTT.
    - Reciba comandos MQTT y escriba en el simulador Modbus.
  - Implementar `gateway.py` en Python como servicio `systemd` en la RPi.
  - Documentar el despliegue y configuración en Raspberry Pi.
- **GitHub:** Carpeta `gateway_practice` con `flows.json`, `gateway.py`, `Dockerfile` y `README.md`.

## CURSO 4: Conectando PLCs Siemens a la Nube (vía Gateway RPi)

- **Objetivo:** Extraer datos de PLCs Siemens (S7) y enviarlos a la nube vía MQTT.
- **Contenido:**
  - Protocolo S7: estructuras DB, bloques de datos y direccionamiento de Tags.
  - Librería Snap7 en Python: instalación, lectura y escritura de DB.
  - Nodos S7 en Node-RED: configuración de flujos para lectura/escritura.
  - Configuración de red del PLC (IP, subred y enrutamiento).
  - **Seguridad:** Aislamiento de red, VPN y control de acceso al PLC.
- **Proyecto Práctico:**
  - Extender `gateway.py` o flujos Node-RED para leer bloques de datos S7 y publicarlos en MQTT.
  - Implementar control de escritura de datos de PLC desde MQTT.
  - Pruebas con PLCSIM o hardware real de Siemens.
- **GitHub:** Carpeta `s7_practice` con `read_s7.py`, `write_s7.py`, `flows_s7.json` y `README.md`.

## CURSO 5: Conectando PLCs Allen Bradley (Logix/Micro) a la Nube (vía Gateway RPi)

- **Objetivo:** Extraer datos de PLCs AB (ControlLogix, CompactLogix, Micro800) y enviarlos a la nube vía MQTT.
- **Contenido:**
  - Protocolo EtherNet/IP (CIP): estructura de paquetes, clases de objetos y path de conexión.
  - Librería pycomm3 en Python: ejemplos prácticos de lectura y escritura de tags.
  - Nodos CIP en Node-RED: configuración y mapeo de tags en flujos.
  - Configuración de RSLinx o software de soporte para conexión.
  - **Seguridad:** Segmentación de red, ACL y control de acceso CIP.
- **Proyecto Práctico:**
  - Crear scripts `read_ab.py` y `write_ab.py` usando pycomm3 para leer/escribir tags.
  - Integrar scripts con MQTT: publicar lecturas y suscribir comandos.
  - Documentar flujos de Node-RED en `flows_ab.json`.
- **GitHub:** Carpeta `cip_practice` con ejemplos Python, `flows_ab.json` y `README.md`.

## CURSO 6: Conectando PLCs Mitsubishi/CODESYS/Coolmay (Modbus Focus)

- **Objetivo:** Aprovechar Modbus TCP/RTU (común en estas marcas) para conectar a la nube.
- **Contenido:**
  - Habilitar y configurar Modbus Server en Mitsubishi FX/Q, CODESYS v3 y Coolmay PLC/HMI.
  - Mapeo de variables internas a registros Modbus: tipos de datos, offset y descriptor.
  - Configuración de comunicación RTU/TCP y diagnóstico de tramas.
  - **Seguridad:** Filtrado de direcciones y autenticación en HMI.
- **Proyecto Práctico:**
  - Extender `gateway.py` para leer/escribir registros Modbus en estos PLCs.
  - Documentar escenarios en CODESYS y PLCSIM.
  - Validar integridad de datos y manejo de errores.
- **GitHub:** Carpeta `modbus_focus_practice` con `config_modbus.sh`, `modbus_client.py`, `flows_modbus_focus.json`, `README.md`.

## CURSO 7: Visualización de Datos IIoT con Grafana e InfluxDB

- **Objetivo:** Crear dashboards para monitorear datos industriales en tiempo real e históricos.
- **Contenido:**
  - Introducción a InfluxDB: buckets, measurements, tags y fields.
  - Instalación y configuración de InfluxDB y Grafana con Docker Compose.
  - Configurar datasources y autenticación en Grafana.
  - Crear dashboards: gráficos, gauges, variables y consultas Flux/InfluxQL.
  - Definir alertas y notificaciones.
- **Proyecto Práctico:**
  - Extender `visualization_practice` o Node-RED para enviar datos a Telegraf e InfluxDB.
  - Diseñar dashboards con paneles para métricas de sensor.
  - Configurar alertas para condiciones críticas.
- **GitHub:** Carpeta `visualization_practice` con `docker-compose.yml`, `telegraf.conf`, `grafana_dashboards.json`, `README.md`.

## CURSO 8: HMI Web Local en Raspberry Pi con Flask y MQTT

- **Objetivo:** Crear una interfaz de usuario local simple directamente en el Gateway RPi.
- **Contenido:**
  - Configuración de Flask y Flask-SocketIO.
  - Integración de Paho-MQTT en un hilo de fondo.
  - Frontend ligero con HTML/CSS/JavaScript (Alpine.js o htmx).
  - Despliegue vía Docker o `systemd`.
- **Proyecto Práctico:**
  - Crear aplicación Flask que suscriba a MQTT y emita WebSockets.
  - Implementar UI para mostrar datos en tiempo real y botones de comando.
  - Documentar despliegue en RPi con TLS.
- **GitHub:** Carpeta `hmi_flask_practice` con código Python, `templates/`, `static/`, `Dockerfile`, `README.md`.

## CURSO 9: Conectividad Segura a la Nube - AWS IoT Core

- **Objetivo:** Conectar de forma segura el Gateway RPi a una plataforma cloud gestionada.
- **Contenido:**
  - Conceptos de AWS IoT Core: Things, certificados X.509, policies y rules engine.
  - Creación y gestión de certificados y políticas IoT.
  - Reglas de enrutamiento a DynamoDB, S3 y Lambda.
  - Monitoreo y logging de mensajes.
- **Proyecto Práctico:**
  - Registrar Gateway como Thing y descargar certificados.
  - Configurar Paho-MQTT para AWS IoT y publicar datos.
  - Verificar datos en consola AWS y DynamoDB.
- **GitHub:** Carpeta `aws_iot_practice` con `aws_client.py`, directorio `certs/` placeholder, `README.md`.

## CURSO 10: Conectividad Segura a la Nube - Azure IoT Hub (vía MQTT)

- **Objetivo:** Conectar de forma segura el Gateway RPi a Azure.
- **Contenido:**
  - Azure IoT Hub: Devices, autenticación SAS y X.509.
  - Configuración de rutas de mensajes a servicios Azure (Storage, Functions).
  - Generación de SAS tokens y gestión de certificados.
  - Integración con Event Hubs y Functions.
- **Proyecto Práctico:**
  - Registrar dispositivo en IoT Hub y obtener credenciales.
  - Script Python con `azure-iot-device` para enviar/recibir datos.
  - Configurar rutas y validar mensajes.
- **GitHub:** Carpeta `azure_iot_practice` con `azure_client.py`, `README.md`.

## CURSO 11: Avanzando con Sparkplug B

- **Objetivo:** Implementar un protocolo IIoT más estructurado y eficiente sobre MQTT.
- **Contenido:**
  - Modelo Sparkplug B: Edge Node, Device State Management y Spine Topics.
  - Payloads con Protobuf y diseño de métricas.
  - Ciclo de vida de Birth, Data y Death.
  - Report-by-exception y manejo de estado.
- **Proyecto Práctico:**
  - Implementar Edge Node con `sparkplug_b` Python.
  - Publicar métricas desde Gateway.
  - Crear Host Application para monitorear ciclos de vida.
- **GitHub:** Carpeta `sparkplug_practice` con `.proto`, `edge_node.py`, `host_app.py`, `README.md`.

## CURSO 12: Desarrollo Embebido Directo a la Nube con ESP32 y Zephyr RTOS

- **Objetivo:** Conectar un microcontrolador directamente a MQTT sin un gateway intermedio.
- **Contenido:**
  - Entorno Zephyr RTOS para ESP32: SDK y toolchain.
  - APIs de Zephyr para I2C/SPI y WiFi.
  - Cliente MQTT en Zephyr.
  - Seguridad: gestión de credenciales y TLS.
- **Proyecto Práctico:**
  - Demostración con sensor BME280 en ESP32.
  - Publicar datos directamente a MQTT Broker.
- **GitHub:** Carpeta `esp32_zephyr_practice` con proyecto Zephyr y `README.md`.

## CURSO 13: Creando Imágenes Linux Personalizadas para Gateways con Yocto

- **Objetivo:** Construir un sistema operativo Linux mínimo y optimizado para el Gateway RPi.
- **Contenido:**
  - Arquitectura Yocto: layers, recipes y BitBake.
  - Configuración de entorno de build.
  - Creación de capa `meta-iiot-gateway`.
  - Recetas para Python, Docker y Node-RED.
- **Proyecto Práctico:**
  - Construir imagen mínima y flashear en RPi.
  - Integrar servicios de cursos anteriores.
- **GitHub:** Carpeta `yocto_gateway_layer` con `README.md` y ejemplos de recipes.

## CURSO 14: Asegurando tu Implementación IIoT

- **Objetivo:** Profundizar en las mejores prácticas de seguridad para todo el stack IIoT.
- **Contenido:**
  - Seguridad en Edge: UFW, actualizaciones y evaluación de vulnerabilidades.
  - MQTT avanzado: autenticación con certificados, ACL y protecciones DoS.
  - API/Web HMI: HTTPS, JWT y prevención OWASP Top 10.
  - VPN y segmentación de red.
  - OTA seguro.
- **Proyecto Práctico:**
  - Configurar Mosquitto con certificados y ACL.
  - Asegurar Flask API (Curso 8) con JWT.
  - Implementar UFW y VPN en Gateway.
- **GitHub:** Carpeta `security_practice` con `mosquitto.conf`, scripts de generación de certs, `README.md`.
