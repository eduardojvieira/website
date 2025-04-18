---
publishDate: 2025-04-21T00:00:00Z
author: Eduardo Vieira
title: Modbus Addressing and Frame Structure (RTU vs TCP)
excerpt: Learn how Modbus addresses devices and the details of RTU and TCP frame formats for reliable communication.
image: '~/assets/images/industrial-automation.jpg'
category: Industrial Automation
tags:
  - modbus
  - addressing
  - frames
metadata:
  canonical: https://eduardovieira.dev/modbus-addressing-frame-structure
---

# Modbus Addressing and Frame Structure (RTU vs TCP)

## Device Addressing

Modbus relies on a unit identifier (slave address) to target devices:

- **RTU:** 1‑byte address (1–247 valid; 0 for broadcast).  
- **TCP:** 1‑byte Unit Identifier in MBAP header (bridging to serial or routing).

## RTU Frame Structure

In RTU mode, frames are delimited by silent intervals (≥3.5 character times) and include:

1. **Slave Address (1 byte)**  
2. **Function Code (1 byte)**  
3. **Data (N bytes)**  
4. **CRC16 Checksum (2 bytes, low‑byte first)**

**Example RTU Frame** (Read 10 coils from slave 1 at address 0):  
`01 01 00 00 00 0A CRC_L CRC_H`

## TCP Frame Structure (MBAP)

Modbus TCP encapsulates the PDU in a 7‑byte MBAP header:

1. **Transaction ID (2 bytes)** – Pair request/response  
2. **Protocol ID (2 bytes)** – Always `0x0000` for Modbus  
3. **Length (2 bytes)** – Byte count following (Unit ID + PDU)  
4. **Unit Identifier (1 byte)** – Slave address or gateway ID  
5. **PDU (Function Code + Data)**

**Example TCP Packet** (same read):  
`00 01 00 00 00 06 01 01 00 00 00 0A`

## Timing and Transport Differences

- **RTU:** Requires precise silent‑interval timing; half‑duplex serial link.  
- **TCP:** Stream‑oriented; no frame timing; full‑duplex Ethernet.

## Frame Size and Limits

- **RTU:** PDU + CRC ≤ 256 bytes.  
- **TCP:** Limited by TCP/IP; typical safe PDU up to 256 bytes.

## Conclusion

A clear grasp of addressing and frame formats for RTU and TCP is key to implementing, diagnosing, and optimizing Modbus communications.
