#!/usr/bin/env python3
import argparse
import threading
from pymodbus.server.sync import StartTcpServer, StartSerialServer
from pymodbus.device import ModbusDeviceIdentification
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext
from pymodbus.transaction import ModbusRtuFramer, ModbusSocketFramer


def run_tcp(context, identity, host, port):
    StartTcpServer(context, identity=identity, address=(host, port))


def run_rtu(context, identity, port, baudrate, parity, stopbits, bytesize):
    StartSerialServer(
        context,
        identity=identity,
        port=port,
        framer=ModbusRtuFramer,
        baudrate=baudrate,
        parity=parity,
        stopbits=stopbits,
        bytesize=bytesize,
        timeout=1,
    )


def main():
    parser = argparse.ArgumentParser(description='Modbus TCP/RTU Simulator')
    parser.add_argument('--mode', choices=['tcp', 'rtu', 'both'], default='both')
    parser.add_argument('--tcp-host', default='0.0.0.0')
    parser.add_argument('--tcp-port', type=int, default=502)
    parser.add_argument('--rtu-port', default='/dev/ttyUSB0')
    parser.add_argument('--rtu-baud', type=int, default=9600)
    parser.add_argument('--rtu-parity', choices=['N', 'E', 'O'], default='N')
    parser.add_argument('--rtu-stopbits', type=int, choices=[1, 2], default=1)
    parser.add_argument('--rtu-bytesize', type=int, choices=[5, 6, 7, 8], default=8)
    args = parser.parse_args()

    # Data store with default values
    store = ModbusSlaveContext(
        di=None, co=None, hr=None, ir=None, zero_mode=True
    )
    context = ModbusServerContext(slaves=store, single=True)

    # Device identity
    identity = ModbusDeviceIdentification()
    identity.VendorName = 'Eduardovieira'
    identity.ProductCode = 'EMod'
    identity.VendorUrl = 'https://eduardovieira.dev'
    identity.ProductName = 'Modbus Simulator'
    identity.ModelName = 'ModbusSim1'
    identity.MajorMinorRevision = '1.0'

    threads = []
    if args.mode in ('tcp', 'both'):
        t_tcp = threading.Thread(
            target=run_tcp,
            args=(context, identity, args.tcp_host, args.tcp_port),
            daemon=True,
        )
        threads.append(t_tcp)
        t_tcp.start()

    if args.mode in ('rtu', 'both'):
        t_rtu = threading.Thread(
            target=run_rtu,
            args=(
                context,
                identity,
                args.rtu_port,
                args.rtu_baud,
                args.rtu_parity,
                args.rtu_stopbits,
                args.rtu_bytesize,
            ),
            daemon=True,
        )
        threads.append(t_rtu)
        t_rtu.start()

    for t in threads:
        t.join()


if __name__ == '__main__':
    main()
