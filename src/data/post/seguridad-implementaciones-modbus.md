---
publishDate: 2025-04-26T00:00:00Z
author: Eduardo Vieira
lang: es
slug: es/seguridad-implementaciones-modbus
title: "Asegurar despliegues Modbus"
excerpt: "Buenas prácticas para proteger redes Modbus: segmentación, cifrado, monitoreo y respuesta a incidentes."
image: '~/assets/images/modbus.jpg'
category: Automatización Industrial
tags:
  - modbus
  - ciberseguridad
metadata:
  canonical: https://eduardovieira.dev/es/seguridad-implementaciones-modbus
---

# Asegurar despliegues Modbus

Modbus nació antes de que la ciberseguridad fuera prioridad, pero aún gobierna millones de dispositivos. Proteger estos entornos exige defensas en capas que respeten las limitaciones operativas. Así lo abordo.

## 1. Segmenta y contiene

- Ubica los dispositivos Modbus en VLAN OT dedicadas o segmentos físicos independientes.
- Usa firewalls industriales para filtrar protocolos y limitar conexiones.
- Crea zonas DMZ para pasarelas que conectan Modbus con redes corporativas.

## 2. Controla el acceso

- Deshabilita códigos de función que no se utilicen (por ejemplo, bloquea escrituras si solo necesitas lecturas).
- Implementa control de acceso basado en roles en las pasarelas; solo cuentas autorizadas pueden escribir.
- Sustituye credenciales compartidas por logins individuales vinculados a un proveedor de identidades.

## 3. Cifra cuando sea posible

- Modbus carece de cifrado nativo, pero puedes encapsular tráfico en túneles seguros (VPN TLS, IPsec).
- Prefiere MQTT Sparkplug B u OPC UA para datos que salen de OT, dejando Modbus solo en el borde.
- Emplea jump hosts seguros para soporte remoto, con MFA y registro de sesiones.

## 4. Monitorea de forma continua

- Despliega monitoreo pasivo para detectar anomalías (códigos inesperados, tormentas de broadcast).
- Registra todas las escrituras y cambios de configuración con hora e ID del operador.
- Define umbrales para fallas de comunicación; errores de CRC repetidos pueden indicar manipulación o ruido.

## 5. Endurece los dispositivos

- Actualiza firmware para corregir vulnerabilidades conocidas.
- Deshabilita puertos de programación o protégelos con llaves cuando no se utilicen.
- Implementa listas blancas en equipos perimetrales para evitar software no autorizado.

## 6. Plan de respuesta a incidentes

- Define procedimientos para aislar dispositivos comprometidos sin comprometer la seguridad de la producción.
- Mantén respaldos offline de configuraciones de PLC/RTU.
- Realiza ejercicios de mesa con equipos OT e IT para practicar los pasos de respuesta.

## 7. Coordinación con proveedores

Colabora con los OEM para conocer su hoja de ruta de seguridad. Solicita divulgación de vulnerabilidades, tiempos de parcheo y guías de endurecimiento.

Modbus seguirá en nuestras plantas por años. Con segmentación, control estricto de acceso, túneles seguros y monitoreo constante, podrás proteger estas redes heredadas sin sacrificar disponibilidad.
