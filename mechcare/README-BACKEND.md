# MechCare Backend Setup

This document explains how to set up and run the MechCare backend server.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Open a terminal in the `mechcare` directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Backend

### Option 1: Production Mode
```bash
npm start
```

### Option 2: Development Mode (with auto-restart)
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Machines

- `GET /api/machines` - Get all machines
- `GET /api/machines/:id` - Get a specific machine
- `POST /api/machines` - Add a new machine
- `PUT /api/machines/:id` - Update a machine
- `DELETE /api/machines/:id` - Delete a machine

### Logs

- `GET /api/machines/:id/logs` - Get logs for a specific machine
- `POST /api/logs` - Add a new log entry

### Data Management

- `GET /api/data` - Get all data (machines + logs)
- `POST /api/data` - Save all data (for import)

## Data Storage

Data is stored in `data/mechcare-data.json` file. The file is automatically created when the server starts.

## Frontend Integration

To use the backend with your frontend:

1. Start the backend server (see above)
2. Open your HTML files through the server at `http://localhost:3000/index.html`
3. The frontend will automatically use the API instead of localStorage

## Switching Between localStorage and Backend

The current frontend (`js/main.js`) uses localStorage. To switch to the backend:

1. Include the API client in your HTML files:
   ```html
   <script src="js/api.js"></script>
   ```

2. Modify `js/main.js` to use `MechCareAPI` instead of localStorage

## Example API Usage

```javascript
// Add a machine
const newMachine = await MechCareAPI.addMachine({
    name: "CNC Machine",
    type: "CNC",
    interval: 30,
    lastMaintenance: "2025-12-05"
});

// Get all machines
const machines = await MechCareAPI.getAllMachines();

// Delete a machine
await MechCareAPI.deleteMachine(machineId);
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, edit `server.js` and change the `PORT` variable to another port (e.g., 3001).

### CORS Errors
The server is configured to allow CORS from all origins. If you still get CORS errors, make sure you're accessing the frontend through the server (http://localhost:3000) and not directly from the file system (file://).

## Production Deployment

For production deployment, consider:

1. Using a proper database (MongoDB, PostgreSQL, etc.) instead of JSON file
2. Adding authentication and authorization
3. Using environment variables for configuration
4. Adding input validation and sanitization
5. Implementing rate limiting
6. Using HTTPS
