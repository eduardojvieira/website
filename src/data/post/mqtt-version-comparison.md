---
publishDate: 2025-04-21T00:00:00Z
author: Eduardo Vieira
title: "MQTT v3.1.1 vs MQTT v5: Diferencias y Migración"
excerpt: "Conoce las novedades de MQTT 5 y cómo actualizar tus sistemas desde la versión 3.1.1."
image: '~/assets/images/mqtt-versions.jpg'
category: IIoT
tags:
  - mqtt
  - mqtt5
  - versiones
metadata:
  canonical: https://eduardovieira.dev/mqtt-version-comparison
---

# MQTT v3.1.1 vs MQTT v5: Diferencias y Migración

MQTT 5 introduce mejoras clave para aplicaciones IIoT, incluyendo propiedades de usuario, suscripciones compartidas y códigos de razón.

## Propiedades de Usuario
- v3.1.1 carece de propiedades, v5 permite _User Properties_ en cabeceras.
- Permite metadata arbitraria (timestamps, device tags) sin payload.

## Suscripciones Compartidas
- v5 soporta Shared Subscriptions para balanceo de carga.
- Sintaxis: `$share/grupo/topic` permite repartir mensajes entre múltiples consumidores.

## Códigos de Razón y Mensajes de Retorno
- v5 añade _Reason Codes_ más detallados en respuestas (PUBACK, SUBACK).
- Facilita diagnósticos y lógica de reintento.

## Otras Mejoras
- LWT Extendido: _Will Properties_ y payloads binarios.
- _Session Expiry Interval_ para gestionar sesiones duraderas.
- _Request Response Exchange_ y _Request Problem Information_.

## Migración de v3.1.1 a v5
1. Actualiza bibliotecas MQTT y broker (e.g., Mosquitto 2.x, EMQX v5).  
2. Revisa configuración de brokers y clientes para soportar v5.  
3. Incorpora nuevas funcionalidades gradualmente (User Properties, Session Expiry).  
4. Prueba interoperabilidad con clientes legacy en v3.1.1.

---
En la próxima entrega cubriremos las mejores prácticas de seguridad en MQTT: cómo proteger tus brokers y clientes con TLS, autenticación y ACLs.
