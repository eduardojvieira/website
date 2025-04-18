---
title: "IIoT Course Series: Connecting the Plant to the Cloud"
date: 2025-04-17
description: "Introducing a series of 14 hands-on courses to learn how to connect industrial devices and PLCs to the cloud using protocols like Modbus, MQTT, and more."
tags:
  - IIoT
  - Courses
  - Automation
  - Cloud
---

Welcome to our new IIoT blog series! In the upcoming posts, we'll explore step-by-step how to connect an industrial plant to the cloud through 14 hands-on courses.

## List of Courses

1. **Course 1: Industrial Communication Fundamentals – Demystifying Modbus**
   - Understand the Modbus protocol (RTU and TCP), its data model, and basic security. Project: simulator, client, and sniffer in Python.
2. **Course 2: MQTT – The Language of Modern IIoT**
   - Master MQTT, QoS, topics, and TLS security. Project: deploy Mosquitto and EMQX with Docker and Python clients.
3. **Course 3: The IIoT Gateway with Raspberry Pi – Bridging Protocols**
   - Use a Raspberry Pi and Node-RED to translate Modbus to MQTT. Project: Node-RED flows and Python gateway service on RPi.
4. **Course 4: Connecting Siemens PLCs to the Cloud (via RPi Gateway)**
   - Read/write S7 data with Snap7 and Node-RED. Project: Node-RED flows and Python scripts for Siemens PLC.
5. **Course 5: Connecting Allen-Bradley PLCs to the Cloud (via RPi Gateway)**
   - Access AB PLCs via EtherNet/IP with pycomm3. Project: Python scripts and Node-RED flows.
6. **Course 6: Connecting Mitsubishi/CODESYS PLCs to the Cloud (Modbus Focus)**
   - Apply Modbus TCP/RTU on various PLCs. Project: Modbus scripts and Node-RED flows.
7. **Course 7: IIoT Data Visualization with Grafana and InfluxDB**
   - Create dashboards in Grafana and InfluxDB. Project: Telegraf, Docker, and monitoring panels.
8. **Course 8: Local Web HMI on Raspberry Pi with Flask and MQTT**
   - Build a web interface with Flask and MQTT. Project: real-time UI and Docker deployment.
9. **Course 9: Secure Cloud Connectivity – AWS IoT Core**
   - Integrate RPi with AWS IoT Core using X.509 certificates. Project: publish data and rules to DynamoDB.
10. **Course 10: Secure Cloud Connectivity – Azure IoT Hub (via MQTT)**
    - Connect RPi to Azure IoT Hub with SAS tokens and certificates. Project: `azure-iot-device` scripts.
11. **Course 11: Advancing with Sparkplug B**
    - Implement the Sparkplug B protocol over MQTT. Project: Python edge node and host application.
12. **Course 12: Embedded Development Direct to Cloud with ESP32 and Zephyr RTOS**
    - Connect ESP32 to MQTT with Zephyr. Project: BME280 sensor demo and direct publication.
13. **Course 13: Building Custom Linux Images for Gateways with Yocto**
    - Create a minimal Linux OS for RPi. Project: `meta-iiot-gateway` layer.
14. **Course 14: Securing Your IIoT Implementation**
    - Best practices for IIoT security. Project: TLS, JWT, UFW, and VPN on the gateway.

Stay tuned for each course post and subscribe so you don't miss any updates! Comments and suggestions are welcome below.
