#!/usr/bin/env python3
import argparse
from pymodbus.client.sync import ModbusTcpClient, ModbusSerialClient

def main():
    parser = argparse.ArgumentParser(description="Modbus TCP/RTU Client")
    parser.add_argument("--mode", choices=["tcp","rtu"], required=True)
    parser.add_argument("--host", default="localhost")
    parser.add_argument("--port", type=int, default=502)
    parser.add_argument("--rtu-port", default="/dev/ttyUSB0")
    parser.add_argument("--baud", type=int, default=9600)
    parser.add_argument("--parity", choices=["N","E","O"], default="N")
    parser.add_argument("--stopbits", type=int, choices=[1,2], default=1)
    parser.add_argument("--bytesize", type=int, choices=[5,6,7,8], default=8)
    parser.add_argument("--unit", type=int, default=1)
    args = parser.parse_args()

    if args.mode == "tcp":
        client = ModbusTcpClient(args.host, port=args.port)
    else:
        client = ModbusSerialClient(
            method='rtu',
            port=args.rtu_port,
            baudrate=args.baud,
            parity=args.parity,
            stopbits=args.stopbits,
            bytesize=args.bytesize,
            timeout=1
        )

    if not client.connect():
        print("Connection failed")
        return

    print("Reading coils 0-3:")
    rr = client.read_coils(0, 4, unit=args.unit)
    print(rr.bits if not rr.isError() else rr)

    print("Reading holding registers 0-1:")
    rr2 = client.read_holding_registers(0, 2, unit=args.unit)
    print(rr2.registers if not rr2.isError() else rr2)

    print("Writing coil 0 ON:")
    wr = client.write_coil(0, True, unit=args.unit)
    print(wr)

    print("Writing register 1=123:")
    wr2 = client.write_register(1, 123, unit=args.unit)
    print(wr2)

    client.close()

if __name__ == "__main__":
    main()
