---
publishDate: 2025-04-30T00:00:00Z
author: Eduardo Vieira
title: "Building Custom Web Applications with ThingsBoard: A Complete Guide"
excerpt: Learn how to develop a custom web application that integrates with ThingsBoard's powerful IoT platform using React and the ThingsBoard REST API.
image: '~/assets/images/industrial-automation.jpg'
category: Industrial Automation
tags:
  - ThingsBoard
  - Web Development
  - IoT
  - API Integration
metadata:
  canonical: "https://eduardovieira.dev/thingsboard-web-application-development"
---

# Building Custom Web Applications with ThingsBoard: A Complete Guide

## Introduction

While ThingsBoard provides excellent built-in dashboards for IoT data visualization, there are many scenarios where you might need to integrate ThingsBoard capabilities into a custom web application. This approach allows for greater flexibility in UI/UX design, seamless integration with existing applications, and the ability to combine ThingsBoard's IoT capabilities with other business systems.

In this guide, we'll explore how to build a custom web application that integrates with ThingsBoard. We'll create a React-based application that communicates with ThingsBoard's REST API to authenticate users, fetch device data, and display real-time telemetry.

## Why Build a Custom Web Application with ThingsBoard?

Before diving into implementation, let's understand why you might want to build a custom web application instead of using ThingsBoard's built-in dashboards:

1. **Custom branding and user experience** - Create a fully branded experience with your company's look and feel
2. **Integration with existing systems** - Combine ThingsBoard data with other business applications
3. **Custom workflows** - Implement specialized business processes not available in standard dashboards
4. **Enhanced security models** - Implement custom authentication and authorization flows
5. **Extended functionality** - Add features beyond what's available in ThingsBoard's UI

## Understanding ThingsBoard's API Architecture

ThingsBoard offers a comprehensive set of REST APIs that provide access to all platform functionality:

- **Authentication API** - Handling user login and token management
- **Device API** - Managing devices and their attributes
- **Telemetry API** - Accessing real-time and historical device data
- **Alarm API** - Working with system alarms
- **Dashboard API** - Managing dashboards programmatically

These APIs use JWT (JSON Web Tokens) for authentication, making them secure and easy to integrate with modern web applications.

## Project Setup: Building a React Application

Let's create a React application that integrates with ThingsBoard. We'll focus on building a device monitoring dashboard that shows real-time telemetry data.

### Step 1: Set Up React Application

First, create a new React application using Create React App:

```bash
npx create-react-app thingsboard-web-app
cd thingsboard-web-app
npm install axios react-router-dom @mui/material @mui/icons-material recharts
```

This installs the necessary dependencies:
- axios for API requests
- react-router-dom for navigation
- Material UI for components
- recharts for data visualization

### Step 2: Configure ThingsBoard API Client

Create a service to handle ThingsBoard API requests:

```javascript
// src/services/thingsboardApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Replace with your ThingsBoard URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tb_token');
    if (token) {
      config.headers['X-Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication service
export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('tb_token', response.data.token);
    localStorage.setItem('tb_refresh_token', response.data.refreshToken);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('tb_token');
    localStorage.removeItem('tb_refresh_token');
  },
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('tb_refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await api.post('/auth/token', { refreshToken });
    localStorage.setItem('tb_token', response.data.token);
    return response.data;
  }
};

// Device service
export const deviceService = {
  getDevices: async (pageSize = 10, page = 0) => {
    return api.get(`/tenant/devices?pageSize=${pageSize}&page=${page}`);
  },
  getDevice: async (deviceId) => {
    return api.get(`/device/${deviceId}`);
  },
  getDeviceTelemetry: async (deviceId, keys, startTs, endTs) => {
    return api.get(`/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`, {
      params: { keys, startTs, endTs }
    });
  },
  getLatestTelemetry: async (deviceId, keys) => {
    return api.get(`/plugins/telemetry/DEVICE/${deviceId}/values/timeseries`, {
      params: { keys }
    });
  }
};

export default api;
```

### Step 3: Create Authentication Components

Let's create a login component:

```javascript
// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/thingsboardApi';
import { 
  TextField, Button, Paper, Typography, Container, Box, Alert 
} from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await authService.login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            ThingsBoard IoT Dashboard
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
```

### Step 4: Create Dashboard and Device Components

Now, let's create a dashboard component to display devices:

```javascript
// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { deviceService } from '../services/thingsboardApi';
import { 
  Container, Typography, Grid, Card, CardContent, 
  CardActions, Button, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await deviceService.getDevices(100);
        setDevices(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching devices:', err);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const viewDeviceDetails = (deviceId) => {
    navigate(`/device/${deviceId}`);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Devices Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device.id.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {device.name}
                </Typography>
                <Typography color="textSecondary">
                  Type: {device.type}
                </Typography>
                <Typography color="textSecondary">
                  Status: {device.active ? 'Active' : 'Inactive'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => viewDeviceDetails(device.id.id)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {devices.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No devices found
        </Typography>
      )}
    </Container>
  );
}

export default Dashboard;
```

Next, create a device detail component to show telemetry:

```javascript
// src/components/DeviceDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deviceService } from '../services/thingsboardApi';
import { 
  Container, Typography, CircularProgress, Paper,
  Grid, Box, Card, CardContent
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function DeviceDetail() {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [telemetry, setTelemetry] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        // Get device details
        const deviceResponse = await deviceService.getDevice(deviceId);
        setDevice(deviceResponse.data);
        
        // Get latest telemetry (assuming temperature and humidity)
        const telemetryKeys = 'temperature,humidity,level';
        const endTs = Date.now();
        const startTs = endTs - 24 * 60 * 60 * 1000; // Last 24 hours
        
        const telemetryResponse = await deviceService.getDeviceTelemetry(
          deviceId, telemetryKeys, startTs, endTs
        );
        
        setTelemetry(telemetryResponse.data);
        
        // Prepare chart data
        if (telemetryResponse.data.temperature) {
          const chartPoints = telemetryResponse.data.temperature.map((point) => ({
            time: new Date(point.ts).toLocaleTimeString(),
            value: point.value,
          }));
          setChartData(chartPoints);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching device data:', err);
        setLoading(false);
      }
    };

    fetchDeviceData();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(async () => {
      try {
        const telemetryKeys = 'temperature,humidity,level';
        const latestResponse = await deviceService.getLatestTelemetry(deviceId, telemetryKeys);
        setTelemetry(latestResponse.data);
      } catch (err) {
        console.error('Error polling telemetry:', err);
      }
    }, 5000); // Poll every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [deviceId]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!device) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Device not found
        </Typography>
      </Container>
    );
  }

  const getLatestValue = (key) => {
    if (telemetry[key] && telemetry[key].length > 0) {
      return telemetry[key][telemetry[key].length - 1].value;
    }
    return 'N/A';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {device.name}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Type: {device.type} | Active: {device.active ? 'Yes' : 'No'}
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Telemetry cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Temperature
              </Typography>
              <Typography variant="h3">
                {getLatestValue('temperature')}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Humidity
              </Typography>
              <Typography variant="h3">
                {getLatestValue('humidity')}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Level
              </Typography>
              <Typography variant="h3">
                {getLatestValue('level')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Chart */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Temperature History
            </Typography>
            {chartData.length > 0 ? (
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Typography>No historical data available</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DeviceDetail;
```

### Step 5: Create App Routing

Set up routing for the application:

```javascript
// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DeviceDetail from './components/DeviceDetail';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('tb_token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/device/:deviceId" 
              element={
                <ProtectedRoute>
                  <DeviceDetail />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
```

Let's create a simple navigation bar:

```javascript
// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/thingsboardApi';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('tb_token');
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };
  
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ThingsBoard Web App
        </Typography>
        
        {isAuthenticated && (
          <Box>
            <Button color="inherit" onClick={handleDashboardClick}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
```

### Step 6: Set Up WebSocket for Real-Time Updates

For real-time telemetry updates, we'll use ThingsBoard's WebSocket API:

```javascript
// src/services/websocketService.js
export default class WebSocketService {
  constructor(token, callback) {
    this.socket = null;
    this.token = token;
    this.callback = callback;
  }
  
  connect(deviceId, keys) {
    // Close existing connection if any
    if (this.socket) {
      this.socket.close();
    }
    
    // Create subscription command
    const subscriptionCommand = {
      tsSubCmds: [
        {
          entityType: 'DEVICE',
          entityId: deviceId,
          keys: keys.split(',')
        }
      ],
      historyCmds: [],
      attrSubCmds: []
    };
    
    // Connect to WebSocket
    const wsUrl = `ws://localhost:8080/api/ws/plugins/telemetry?token=${this.token}`;
    this.socket = new WebSocket(wsUrl);
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.socket.send(JSON.stringify(subscriptionCommand));
    };
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.subscriptionId) {
        // Store subscription ID
        this.subscriptionId = data.subscriptionId;
      } else if (data.data) {
        // Handle telemetry update
        this.callback(data.data);
      }
    };
    
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
```

Update the DeviceDetail component to use WebSocket:

```javascript
// Update DeviceDetail.js to include WebSocket
import WebSocketService from '../services/websocketService';

// Inside the useEffect of DeviceDetail component
useEffect(() => {
  // ...existing code...
  
  // Set up WebSocket for real-time updates
  const token = localStorage.getItem('tb_token');
  const telemetryKeys = 'temperature,humidity,level';
  
  const handleTelemetryUpdate = (data) => {
    setTelemetry((prevTelemetry) => {
      const newTelemetry = { ...prevTelemetry };
      
      // Update each key with new values
      Object.keys(data).forEach((entityId) => {
        Object.keys(data[entityId]).forEach((key) => {
          if (!newTelemetry[key]) {
            newTelemetry[key] = [];
          }
          
          // Add new telemetry points
          data[entityId][key].forEach((point) => {
            newTelemetry[key].push(point);
          });
          
          // Sort by timestamp
          newTelemetry[key].sort((a, b) => a.ts - b.ts);
        });
      });
      
      return newTelemetry;
    });
  };
  
  const wsService = new WebSocketService(token, handleTelemetryUpdate);
  wsService.connect(deviceId, telemetryKeys);
  
  return () => {
    // Clean up WebSocket on component unmount
    wsService.disconnect();
  };
}, [deviceId]);
```

## Extending Your Application with Advanced Features

The basic application we've built can be extended with more advanced features:

### 1. User Management

Add user registration and management through ThingsBoard's User API:

```javascript
// Add to thingsboardApi.js
export const userService = {
  getCurrentUser: async () => {
    return api.get('/auth/user');
  },
  getUsers: async (pageSize = 10, page = 0) => {
    return api.get(`/tenant/users?pageSize=${pageSize}&page=${page}`);
  },
  saveUser: async (user) => {
    return api.post('/user', user);
  }
};
```

### 2. Device Provisioning

Add functionality to provision new devices:

```javascript
// Add to thingsboardApi.js
export const provisioningService = {
  provisionDevice: async (deviceName, deviceType) => {
    // Create device
    const device = {
      name: deviceName,
      type: deviceType
    };
    const deviceResponse = await api.post('/device', device);
    
    // Generate credentials for the device
    const credentialsResponse = await api.get(`/device/${deviceResponse.data.id.id}/credentials`);
    
    return {
      device: deviceResponse.data,
      credentials: credentialsResponse.data
    };
  }
};
```

### 3. Custom Device Control

Implement device control functionality:

```javascript
// Add to thingsboardApi.js
export const rpcService = {
  sendOneWayCommand: async (deviceId, method, params) => {
    return api.post(`/rpc/oneway/${deviceId}`, {
      method,
      params
    });
  },
  sendTwoWayCommand: async (deviceId, method, params) => {
    return api.post(`/rpc/twoway/${deviceId}`, {
      method,
      params
    });
  }
};
```

### 4. Embedding ThingsBoard Dashboards

You can also embed existing ThingsBoard dashboards into your application:

```javascript
// src/components/EmbeddedDashboard.js
import React from 'react';
import { Box } from '@mui/material';

function EmbeddedDashboard({ dashboardId }) {
  const token = localStorage.getItem('tb_token');
  const tbUrl = 'http://localhost:8080'; // Replace with your ThingsBoard URL
  const iframeUrl = `${tbUrl}/dashboard/${dashboardId}?jwt_token=${token}`;
  
  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 64px)' }}>
      <iframe
        title="ThingsBoard Dashboard"
        src={iframeUrl}
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </Box>
  );
}

export default EmbeddedDashboard;
```

## Deploying Your Application

To deploy your ThingsBoard web application to production:

1. **Build the React application:**
```bash
npm run build
```

2. **Deploy the build files to a web server:**
   - Nginx
   - Apache
   - Cloud hosting (AWS, Azure, etc.)

3. **Configure CORS on ThingsBoard:**
   - Edit your ThingsBoard configuration to allow cross-origin requests from your web application domain

## Industrial Applications

This type of custom ThingsBoard web application is particularly useful in industrial settings:

### Manufacturing Execution Systems (MES)

- Combine ThingsBoard IoT data with production planning
- Track machine efficiency and downtime
- Integrate with ERP systems

### Energy Management

- Monitor energy consumption across facilities
- Implement demand response strategies
- Generate custom energy reports

### Field Service Management

- Provide technicians with device status and history
- Enable remote diagnostics
- Schedule preventive maintenance based on telemetry

## Security Considerations

When building web applications that integrate with ThingsBoard, pay attention to these security considerations:

1. **Token storage** - Use secure storage for JWT tokens
2. **API proxying** - Consider proxying API requests through your backend
3. **HTTPS** - Always use HTTPS in production
4. **Token refresh** - Implement token refresh mechanisms
5. **Access control** - Implement proper permission checks

## Conclusion

Building a custom web application that integrates with ThingsBoard provides the flexibility to create tailored solutions for specific industrial needs while leveraging the powerful IoT capabilities of the platform.

By using the ThingsBoard REST API and WebSocket interface, you can create rich, interactive applications that provide real-time monitoring, control, and analysis of your IoT devices. This approach combines the best of both worlds: ThingsBoard's robust IoT infrastructure and the flexibility of custom web development.

The example application we've built demonstrates the foundational principles, but you can extend it with additional features such as rule engine integration, alarm management, and advanced analytics to create comprehensive industrial IoT solutions tailored to your specific requirements.
