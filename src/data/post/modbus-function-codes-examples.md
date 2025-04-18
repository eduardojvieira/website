---
publishDate: 2025-04-20T00:00:00Z
author: Eduardo Vieira
title: Modbus Function Codes Explained with Examples
ecerpt: A comprehensive guide to all Modbus function codes—from reading coils to writing registers—complete with practical examples, byte‑level frame breakdowns, and CRC calculation.
image: '~/assets/images/industrial-automation.jpg'
category: Industrial Automation
tags:
  - modbus
  - function codes
metadata:
  canonical: https://eduardovieira.dev/modbus-function-codes-examples
---

# All Modbus Function Codes Explained with Practical Use Cases and Frame Details

Below are real-world scenarios for each function code, with complete RTU frame breakdowns (hex), response parsing, and CRC16 calculation details.

## 1. Read Coils (FC 1)
- **Use Case:** Checking status of cooling system zone valves (Device ID = 0x02).
This command instructs the master to query the on/off states of four valve coils (zones 1–4). Upon receiving the request, the slave reads its coil outputs, packs the four status bits into one data byte (LSB first), and appends a CRC for integrity.

**Request Frame (Hex):** `02 01 00 00 00 04 B8 0A`
- `02`: Slave Address  
- `01`: Function Code (Read Coils)  
- `00 00`: Start Address (0x0000)  
- `00 04`: Quantity (4 coils)  
- `B8 0A`: CRC16 (Low byte 0xB8, High byte 0x0A)

**Response Frame (Hex):** `02 01 01 0D 7A F8`
- `02`: Slave Address  
- `01`: Function Code  
- `01`: Byte Count (1)  
- `0D`: Data (00001101 ⇒ Valve1=1, Valve3=1, Valve4=1)  
- `7A F8`: CRC16

## 2. Read Discrete Inputs (FC 2)
- **Use Case:** Emergency stop button status (Device ID = 0x01).
The controller polls two discrete inputs representing emergency stop buttons. The slave samples its input terminals, maps their states into bits (1=pressed), and sends back the bits with CRC validation.

**Request:** `01 02 00 10 00 02 65 C9`  
**Response:** `01 02 01 03 44 AC`  
- `03`: Data (00000011 ⇒ both buttons pressed)

## 3. Read Holding Registers (FC 3)
- **Use Case:** Monitoring temperature and voltage (Device ID = 0x03).
The master requests two 16-bit holding registers containing temperature (×100) and voltage (×100) values. The slave reads registers, returns 4 data bytes (big-endian), and ensures frame integrity with CRC.

**Request:** `03 03 00 00 00 02 C4 0B`  
**Response:** `03 03 04 08 66 04 00 9A 85`  
- `04`: Byte Count  
- `08 66`: 2150 (21.50°C)  
- `04 00`: 1024 (10.24 V)

## 4. Read Input Registers (FC 4)
- **Use Case:** Sampling pressure sensor (Device ID = 0x04).
This operation reads one input register from the sensor module. The slave returns a 2-byte value (big-endian) representing pressure in tenths of PSI, followed by CRC.

**Request:** `04 04 00 02 00 01 31 CA`  
**Response:** `04 04 02 00 FA E5 1C`  
- `00 FA`: 250 (25.0 PSI)

## 5. Write Single Coil (FC 5)
- **Use Case:** Starting conveyor motor (Device ID = 0x01).
The master writes 0xFF00 to coil address 3 to energize the start relay. The slave executes the action and echoes the exact request frame as confirmation, including CRC.

**Request:** `01 05 00 03 FF 00 8E F9`  
- `FF 00`: ON

**Response (Echo):** `01 05 00 03 FF 00 8E F9`

## 6. Write Single Register (FC 6)
- **Use Case:** Setting temperature setpoint to 2000 (Device ID = 0x05).
This command writes value 2000 to holding register address 2, updating the setpoint. The slave program applies the new setpoint and returns the same frame to acknowledge success.

**Request:** `05 06 00 02 07 D0 A9 7E`  
- `07 D0`: 2000

**Response (Echo):** `05 06 00 02 07 D0 A9 7E`

## 15. Write Multiple Coils (FC 15)
- **Use Case:** Activating multiple indicator lights (Device ID = 0x02).
The master sets three coil statuses in one frame: bits packed into a data byte. The slave applies the changes and responds with the address and count as an echo, with CRC.

**Request:** `02 0F 00 00 00 03 01 05 C5 0E`  
- `01`: Byte Count  
- `05`: Data (00000101 ⇒ Light1=ON, Light3=ON)

**Response (Echo):** `02 0F 00 00 00 03 C5 0E`

## 16. Write Multiple Registers (FC 16)
- **Use Case:** Loading PID parameters [100, 200] (Device ID = 0x03).
This frame writes two consecutive registers with PID constants. The slave updates its parameters and returns a response indicating the start address and quantity written, plus CRC.

**Request:** `03 10 00 10 00 02 04 00 64 00 C8 45 6A`  
- `04`: Byte Count  
- `00 64`: 100  
- `00 C8`: 200

**Response (Echo):** `03 10 00 10 00 02 45 6A`

## CRC16 Calculation
CRC16 uses polynomial 0xA001 with initial value 0xFFFF. The CRC is appended little-endian (low byte first):
```python
def compute_crc(data: bytes) -> bytes:
    crc = 0xFFFF
    for b in data:
        crc ^= b
        for _ in range(8):
            if crc & 1:
                crc = (crc >> 1) ^ 0xA001
            else:
                crc >>= 1
    return crc.to_bytes(2, 'little')

# Example:
msg = bytes([0x02,0x01,0x00,0x00,0x00,0x04])
print(compute_crc(msg).hex())  # 'b80a'
```

## Less Common Codes
- **FC 20/21: Read/Write File Record**: Allows reading and writing file records in structured data blocks. The master includes file and record numbers; the slave returns or stores the specified records, appending a CRC16 checksum for integrity.
- **FC 22: Mask Write Register**: Enables bitwise modification of a holding register using AND/OR masks. Commonly used to toggle control flags without altering other bits. The slave applies masks and echoes the operation with CRC.
- **FC 23: Read FIFO Queue**: Retrieves entries from a FIFO queue in the slave (e.g., event or alarm logs). The slave returns the byte count and sequential data bytes for each queued entry, followed by CRC16 for validity.

## Conclusion
Understanding and using the correct function codes is essential for precise control and monitoring in Modbus networks. These examples provide a solid foundation for building robust automation scripts.
