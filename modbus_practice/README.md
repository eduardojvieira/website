# Modbus Practice

This project provides a simple Modbus TCP and RTU simulator, a client for testing, and an RTU sniffer/logger.

## Files

- `simulator.py`: Modbus TCP and RTU server using `pymodbus`.
- `client.py`: Example Modbus master for TCP or RTU operations.
- `rtu_sniffer.py`: Basic RTU frame logger using `pyserial`.
- `requirements.txt`: Python dependencies.

## Requirements

- Python 3.7+
- `pymodbus`
- `pyserial`

Install dependencies:

```bash
pip install -r requirements.txt
```

## Usage

### Simulator

Run both TCP and RTU servers:

```bash
python simulator.py
```

Run only TCP:

```bash
python simulator.py --mode tcp --tcp-port 5020
```

Run only RTU:

```bash
python simulator.py --mode rtu --rtu-port /dev/ttyUSB0 --rtu-baud 9600
```

### Client

TCP mode:

```bash
python client.py --mode tcp --host localhost --port 5020
```

RTU mode:

```bash
python client.py --mode rtu --rtu-port /dev/ttyUSB0 --baud 9600 --unit 1
```

### RTU Sniffer

```bash
python rtu_sniffer.py --port /dev/ttyUSB0 --baud 9600 --log rtu_log.txt
```
