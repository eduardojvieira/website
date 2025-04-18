#!/usr/bin/env python3
import argparse
import serial
import time

def main():
    parser = argparse.ArgumentParser(description="Modbus RTU Sniffer/Logger")
    parser.add_argument("--port", required=True, help="Serial port, e.g. /dev/ttyUSB0")
    parser.add_argument("--baud", type=int, default=9600, help="Baud rate")
    parser.add_argument("--parity", choices=["N","E","O"], default="N")
    parser.add_argument("--stopbits", type=int, choices=[1,2], default=1)
    parser.add_argument("--bytesize", type=int, choices=[5,6,7,8], default=8)
    parser.add_argument("--log", default="rtu_log.txt", help="Output log file")
    args = parser.parse_args()

    ser = serial.Serial(
        port=args.port,
        baudrate=args.baud,
        parity=args.parity,
        stopbits=args.stopbits,
        bytesize=args.bytesize,
        timeout=0.1
    )

    threshold = 0.005  # seconds to detect frame boundary
    frame = bytearray()
    last_time = time.time()

    with open(args.log, "a") as logfile:
        print(f"Logging RTU frames to {args.log}. Press Ctrl+C to exit.")
        try:
            while True:
                byte = ser.read(1)
                now = time.time()
                if byte:
                    # detect new frame by idle time
                    if frame and now - last_time > threshold:
                        hex_str = frame.hex()
                        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
                        log_line = f"{timestamp} FRAME: {hex_str}\n"
                        print(log_line.strip())
                        logfile.write(log_line)
                        logfile.flush()
                        frame.clear()
                    frame.extend(byte)
                    last_time = now
        except KeyboardInterrupt:
            print("Exiting.")

if __name__ == "__main__":
    main()
