---
publishDate: 2025-03-20T00:00:00Z
author: Eduardo Vieira
title: "ThingsBoard as SCADA: Building a Tank Level Monitoring System"
excerpt: Learn how to implement a complete SCADA system using ThingsBoard to monitor and control tank levels with this hands-on tutorial.
image: '~/assets/images/industrial-automation.jpg'
category: Industrial Automation
tags:
  - SCADA
  - ThingsBoard
  - Tank Monitoring
  - IoT
metadata:
  canonical: "https://eduardovieira.dev/thingsboard-scada-tank-monitoring"
---

# ThingsBoard as SCADA: Building a Tank Level Monitoring System

## Introduction to SCADA Systems

SCADA (Supervisory Control and Data Acquisition) systems form the backbone of modern industrial automation processes. They provide operators with real-time monitoring capabilities, alarm management, and control functionality for industrial equipment and processes.

Traditional SCADA systems often require expensive proprietary software and hardware. However, with the rise of IoT platforms like ThingsBoard, implementing sophisticated SCADA systems has become more accessible, flexible, and cost-effective.

## Why Use ThingsBoard as a SCADA Solution?

ThingsBoard offers several advantages as a SCADA system:

1. **Open-source foundation** - Reduces licensing costs while maintaining enterprise-grade capabilities
2. **Cloud and on-premises deployment** - Flexibility to choose deployment model
3. **Scalable architecture** - Handles thousands of devices and millions of data points
4. **Modern web-based interface** - No client software installation required
5. **Specialized SCADA widgets** - Purpose-built components for industrial visualization
6. **Multi-protocol support** - Connects to industrial equipment via MQTT, HTTP, Modbus, OPC-UA, and more

In this tutorial, we'll implement a tank level monitoring system using ThingsBoard's SCADA capabilities, demonstrating how to create an effective industrial monitoring solution.

## Understanding ThingsBoard SCADA Features

Starting from version 3.8.0, ThingsBoard has introduced specialized SCADA features designed specifically for industrial applications:

### SCADA Dashboard Layout

ThingsBoard's SCADA dashboard layout is optimized for industrial visualization:
- Zero margins between widgets for precise pipe and component connections
- Transparent widget backgrounds by default
- Grid-based positioning for precise component alignment

### SCADA Symbols

The platform provides specialized scalable widgets called SCADA symbols that represent industrial components:
- Tanks and vessels
- Pumps and motors
- Valves and actuators
- Pipes and connections
- Sensors and indicators

These symbols can dynamically change appearance based on telemetry data and can be configured to send control commands to physical devices.

## Building a Tank Level Monitoring System

Let's build a complete tank level monitoring SCADA system using ThingsBoard. This system will visualize tank levels, enable control of valves and pumps, and provide alarm functionality.

### Step 1: Set Up ThingsBoard

First, ensure you have ThingsBoard installed. You can use the Docker installation method as described in my previous post:

```bash
# Create data and logs directories
mkdir -p ~/.mytb-data && sudo chown -R 799:799 ~/.mytb-data
mkdir -p ~/.mytb-logs && sudo chown -R 799:799 ~/.mytb-logs

# Run ThingsBoard container
docker run -it -p 8080:9090 -p 7070:7070 -p 1883:1883 -p 5683-5688:5683-5688/udp \
  -v ~/.mytb-data:/data -v ~/.mytb-logs:/var/log/thingsboard \
  --name mytb --restart always thingsboard/tb-postgres
```

Once ThingsBoard is running, access the web interface at http://localhost:8080 using the default tenant credentials.

### Step 2: Create Devices for Tank Monitoring

Let's set up the devices required for our tank monitoring system:

1. **Navigate to Devices**:
   - Go to "Entities" → "Devices"
   - Click the "+" button to add a new device

2. **Create a Tank Device**:
   - Name: "Water Tank 01"
   - Type: "Tank"
   - Click "Add"

3. **Create a Valve Device**:
   - Name: "Inlet Valve 01"
   - Type: "Valve"
   - Click "Add"

4. **Create a Pump Device**:
   - Name: "Outlet Pump 01"
   - Type: "Pump"
   - Click "Add"

### Step 3: Create a SCADA Dashboard

Now, let's create a SCADA dashboard to visualize our tank system:

1. **Create a New Dashboard**:
   - Go to "Dashboards"
   - Click "+" and select "Create new dashboard"
   - Name it "Tank Monitoring SCADA"
   - Click "Add"

2. **Configure the Dashboard Layout**:
   - Click the "Layouts" button in the top-left corner
   - Change the layout from "Default" to "SCADA"
   - Click "Save"

3. **Add Entity Aliases**:
   - Click on "Entity aliases" at the bottom right
   - Add three aliases for each of our devices:
     - "tank": Filter by name "Water Tank 01"
     - "valve": Filter by name "Inlet Valve 01"
     - "pump": Filter by name "Outlet Pump 01"
   - Click "Save"

### Step 4: Add SCADA Symbols to the Dashboard

Now, let's design our tank monitoring system using SCADA symbols:

1. **Add a Tank Symbol**:
   - Click the "+" button to add a widget
   - Select "SCADA widgets" → "SCADA symbol"
   - Select the "tank" entity alias
   - Choose a tank symbol from the symbol library
   - Configure data mapping:
     - Map "level" telemetry to the fill level
     - Map "temperature" telemetry to color (optional)
   - Set the size and position on the dashboard
   - Click "Add"

2. **Add Valve Symbol**:
   - Add another SCADA symbol widget
   - Select the "valve" entity alias
   - Choose a valve symbol
   - Configure data mapping:
     - Map "state" telemetry to the valve state (open/closed)
   - Enable control capability:
     - Toggle RPC command: "setState"
     - Command parameters: {"state": true/false}
   - Position the valve at the tank inlet
   - Click "Add"

3. **Add Pump Symbol**:
   - Add another SCADA symbol widget
   - Select the "pump" entity alias
   - Choose a pump symbol
   - Configure data mapping:
     - Map "state" telemetry to the pump state (on/off)
     - Map "speed" telemetry to rotation speed (optional)
   - Enable control capability:
     - Toggle RPC command: "setState"
     - Command parameters: {"state": true/false}
   - Position the pump at the tank outlet
   - Click "Add"

4. **Add Connecting Pipes**:
   - Add SCADA symbol widgets with pipe symbols
   - Choose appropriate pipe shapes and angles
   - Position them to connect the valve to the tank and the tank to the pump
   - Adjust colors and sizes as needed

### Step 5: Add Additional Dashboard Widgets

To enhance our SCADA interface, let's add more useful widgets:

1. **Level Gauge**:
   - Add a "Gauge" widget
   - Select the "tank" entity alias
   - Configure to display "level" telemetry
   - Position near the tank symbol

2. **Historical Chart**:
   - Add a "Time Series" widget
   - Select the "tank" entity alias
   - Configure to display "level" telemetry history
   - Position at the bottom of the dashboard

3. **Alarm Widget**:
   - Add an "Alarms" widget
   - Configure to show all alarms related to our tank system
   - Position at the bottom of the dashboard

### Step 6: Configure Alarm Rules

Let's set up alarm rules to monitor tank conditions:

1. **Navigate to Rule Chains**:
   - Go to "Rule Engine" → "Rule Chains"
   - Open the "Root Rule Chain"

2. **Add High Level Alarm Rule**:
   - Add a "JS Filter" node
   - Configure with the script:
   ```javascript
   return msg.level > 90;
   ```
   - Connect to a "Create Alarm" node
   - Configure the alarm:
     - Alarm type: "High Level"
     - Severity: "Critical"
     - Propagate: true

3. **Add Low Level Alarm Rule**:
   - Add another "JS Filter" node
   - Configure with the script:
   ```javascript
   return msg.level < 10;
   ```
   - Connect to a "Create Alarm" node
   - Configure the alarm:
     - Alarm type: "Low Level"
     - Severity: "Warning"
     - Propagate: true

4. **Save the Rule Chain**:
   - Click "Save" to apply the changes

### Step 7: Simulate Tank Data

For demonstration purposes, let's simulate data for our tank system:

1. **Create a Python Script for Simulation**:

```python
import time
import random
import requests
import json
import math

# ThingsBoard settings
THINGSBOARD_HOST = 'localhost'
THINGSBOARD_PORT = 8080

# Device access tokens (replace with your actual tokens)
TANK_TOKEN = 'YOUR_TANK_ACCESS_TOKEN'
VALVE_TOKEN = 'YOUR_VALVE_ACCESS_TOKEN'
PUMP_TOKEN = 'YOUR_PUMP_ACCESS_TOKEN'

# Endpoint for HTTP API
TANK_ENDPOINT = f'http://{THINGSBOARD_HOST}:{THINGSBOARD_PORT}/api/v1/{TANK_TOKEN}/telemetry'
VALVE_ENDPOINT = f'http://{THINGSBOARD_HOST}:{THINGSBOARD_PORT}/api/v1/{VALVE_TOKEN}/telemetry'
PUMP_ENDPOINT = f'http://{THINGSBOARD_HOST}:{THINGSBOARD_PORT}/api/v1/{PUMP_TOKEN}/telemetry'

# Initial states
valve_state = False
pump_state = False
tank_level = 50.0
tank_temperature = 22.0

# Simulation parameters
INFLOW_RATE = 2.0  # % per second when valve is open
OUTFLOW_RATE = 3.0  # % per second when pump is on

# Function to send data to ThingsBoard
def send_telemetry(endpoint, data):
    try:
        response = requests.post(endpoint, json=data)
        print(f"Data sent to {endpoint}: {data}")
        print(f"Response: {response.status_code}")
        return response.status_code == 200
    except Exception as e:
        print(f"Failed to send data: {e}")
        return False

# Main simulation loop
while True:
    # Calculate new tank level based on valve and pump states
    if valve_state and tank_level < 100:
        tank_level = min(100, tank_level + INFLOW_RATE)
    
    if pump_state and tank_level > 0:
        tank_level = max(0, tank_level - OUTFLOW_RATE)
    
    # Add some random fluctuation to temperature
    tank_temperature += random.uniform(-0.2, 0.2)
    tank_temperature = min(30, max(15, tank_temperature))
    
    # Prepare and send tank telemetry
    tank_data = {
        'level': round(tank_level, 1),
        'temperature': round(tank_temperature, 1),
        'timestamp': int(time.time() * 1000)
    }
    send_telemetry(TANK_ENDPOINT, tank_data)
    
    # Prepare and send valve telemetry
    valve_data = {
        'state': valve_state,
        'timestamp': int(time.time() * 1000)
    }
    send_telemetry(VALVE_ENDPOINT, valve_data)
    
    # Prepare and send pump telemetry
    pump_data = {
        'state': pump_state,
        'speed': 100 if pump_state else 0,
        'timestamp': int(time.time() * 1000)
    }
    send_telemetry(PUMP_ENDPOINT, pump_data)
    
    # Simulate valve and pump changes based on level thresholds
    if tank_level > 90 and valve_state:
        valve_state = False
        print("Valve automatically closed due to high level")
    elif tank_level < 20 and not valve_state:
        valve_state = True
        print("Valve automatically opened due to low level")
    
    if tank_level < 5 and pump_state:
        pump_state = False
        print("Pump automatically stopped due to low level")
    
    # Every 30 seconds, toggle the pump for demonstration
    if int(time.time()) % 30 == 0:
        pump_state = not pump_state
        print(f"Pump state changed to: {pump_state}")
    
    # Wait before next update
    time.sleep(1)
```

2. **Get Device Access Tokens**:
   - For each device, go to its details page
   - Navigate to the "Device Credentials" tab
   - Copy the access token
   - Replace the placeholder tokens in the script

3. **Run the Simulation**:
   - Execute the Python script to start sending simulated data
   - Watch as the SCADA dashboard updates in real-time

### Step 8: Interact with the SCADA System

Now you can interact with your SCADA system:

1. **Monitor Tank Levels**:
   - Watch the tank fill and empty in real-time
   - Observe level readings on the gauge

2. **Control Valves and Pumps**:
   - Click on the valve symbol to open/close it
   - Click on the pump symbol to turn it on/off

3. **View Alarms**:
   - Observe alarm triggering when levels reach thresholds
   - Acknowledge alarms through the alarm widget

## Enhancing the Tank Monitoring SCADA System

To make your tank monitoring SCADA system more robust for industrial applications, consider these enhancements:

### 1. Multi-Tank Monitoring

Extend the system to monitor multiple tanks:
- Create additional tank devices
- Add them to the SCADA dashboard
- Use dynamic device selection to switch between tanks

### 2. Integration with Physical Sensors

Connect real physical sensors to the system:
- Ultrasonic level sensors for accurate level measurements
- Temperature sensors for monitoring liquid temperature
- Flow meters for measuring inflow and outflow rates

### 3. Advanced Automation Rules

Implement more sophisticated automation rules:
- Automatic pump scheduling based on time or demand
- Tank balancing across multiple tanks
- Predictive maintenance based on pump operating patterns

### 4. Mobile Access

Enable remote monitoring and control:
- Configure user permissions for mobile access
- Set up email and SMS notifications for critical alarms
- Create a dedicated mobile dashboard with essential controls

## Industrial Applications of Tank Monitoring SCADA

Tank level monitoring SCADA systems built with ThingsBoard have numerous industrial applications:

### Water Management

- Municipal water treatment facilities
- Reservoir level monitoring
- Distribution system pressure management
- Water quality monitoring

### Oil and Gas Industry

- Fuel storage tank monitoring
- Oil well production monitoring
- Pipeline pressure monitoring
- Custody transfer management

### Chemical Processing

- Chemical storage tank monitoring
- Batch process management
- Mixing tank level control
- Chemical dosing systems

### Food and Beverage

- Ingredient storage monitoring
- Fermentation tank management
- CIP (Clean-in-Place) systems
- Product storage and distribution

## Conclusion

ThingsBoard offers a powerful, flexible, and cost-effective platform for implementing industrial SCADA systems. The tank monitoring system we've built demonstrates how easily you can create sophisticated industrial monitoring and control applications without specialized proprietary SCADA software.

By leveraging ThingsBoard's SCADA capabilities, industrial automation engineers can rapidly develop and deploy monitoring systems that provide real-time visibility, control, and alarm management for critical industrial processes.

Whether you're monitoring water tanks, chemical storage, fuel levels, or any other industrial vessel, ThingsBoard's SCADA features provide the tools needed to create effective industrial monitoring solutions that scale from simple applications to complex enterprise systems.

For more complex industrial applications, ThingsBoard can be integrated with additional industrial protocols like Modbus, OPC-UA, and BACnet through the ThingsBoard Gateway, allowing you to connect virtually any industrial equipment to your SCADA system.
