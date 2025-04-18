---
publishDate: 2025-05-14T00:00:00Z
author: Eduardo Vieira
title: "MQTT Payload Formats: JSON, Binary, and Protobuf for IIoT"
excerpt: "Discover when to use JSON, binary formats, or Protobuf for your MQTT messages in industrial environments."
image: '~/assets/images/mqtt-payload-formats.jpg'
category: IIoT
tags:
  - mqtt
  - payload
  - json
  - protobuf
metadata:
  canonical: https://eduardovieira.dev/mqtt-payload-formats
---

# MQTT Payload Formats: JSON, Binary, and Protobuf for IIoT

Choosing the payload format impacts performance, interoperability, and ease of development.

## JSON (Plain Text)
- Lightweight and human-readable; ideal for prototypes and debugging.
- Widely supported across all languages.
- **Cons:** larger size, slower parsing.

```json
{"sensor_id":"S1","value":23.5,"unit":"°C"}
```

## Binary
- Smaller size; useful on bandwidth-constrained links.
- Use struct or C structs to define the layout.
- **Cons:** less readable, risk of endianness errors.

```python
import struct
# sensor_id:uint8, value:float32
payload = struct.pack('<Bf', 1, 23.5)
```

## Protobuf
- Strongly typed, compact structures.
- Define a schema in .proto and generate client/server code.
- **Cons:** requires code generation and version management.

.proto:
```protobuf
syntax = "proto3";
message SensorData {
  uint32 sensor_id = 1;
  float value = 2;
  string unit = 3;
}
```

```python
from sensor_pb2 import SensorData
msg = SensorData(sensor_id=1, value=23.5, unit="°C")
payload = msg.SerializeToString()
```

---
In the next post, we'll analyze the differences between MQTT v3.1.1 and v5, and how to leverage the latest version's new features.
