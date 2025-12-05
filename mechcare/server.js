const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'mechcare-data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Ensure data directory exists
async function ensureDataDirectory() {
    try {
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    } catch (error) {
        console.error('Error creating data directory:', error);
    }
}

// Read data from file
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return default structure
        return {
            machines: [],
            logs: []
        };
    }
}

// Write data to file
async function writeData(data) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

// API Routes

// Get all data
app.get('/api/data', async (req, res) => {
    try {
        const data = await readData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Get all machines
app.get('/api/machines', async (req, res) => {
    try {
        const data = await readData();
        res.json(data.machines || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read machines' });
    }
});

// Get single machine by ID
app.get('/api/machines/:id', async (req, res) => {
    try {
        const data = await readData();
        const machine = data.machines.find(m => m.id === req.params.id);
        if (machine) {
            res.json(machine);
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read machine' });
    }
});

// Add new machine
app.post('/api/machines', async (req, res) => {
    try {
        const data = await readData();
        const newMachine = {
            id: Date.now().toString(),
            ...req.body,
            createdDate: new Date().toISOString()
        };
        data.machines.push(newMachine);
        await writeData(data);
        res.status(201).json(newMachine);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add machine' });
    }
});

// Update machine
app.put('/api/machines/:id', async (req, res) => {
    try {
        const data = await readData();
        const index = data.machines.findIndex(m => m.id === req.params.id);
        if (index !== -1) {
            data.machines[index] = { ...data.machines[index], ...req.body };
            await writeData(data);
            res.json(data.machines[index]);
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update machine' });
    }
});

// Delete machine
app.delete('/api/machines/:id', async (req, res) => {
    try {
        const data = await readData();
        const index = data.machines.findIndex(m => m.id === req.params.id);
        if (index !== -1) {
            data.machines.splice(index, 1);
            // Also delete associated logs
            data.logs = data.logs.filter(log => log.machineId !== req.params.id);
            await writeData(data);
            res.json({ message: 'Machine deleted successfully' });
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete machine' });
    }
});

// Get logs for a machine
app.get('/api/machines/:id/logs', async (req, res) => {
    try {
        const data = await readData();
        const logs = data.logs.filter(log => log.machineId === req.params.id);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read logs' });
    }
});

// Add log entry
app.post('/api/logs', async (req, res) => {
    try {
        const data = await readData();
        const newLog = {
            id: Date.now().toString(),
            ...req.body,
            timestamp: new Date().toISOString()
        };
        data.logs.push(newLog);
        await writeData(data);
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add log' });
    }
});

// Save all data (for import/export)
app.post('/api/data', async (req, res) => {
    try {
        await writeData(req.body);
        res.json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Initialize server
async function startServer() {
    await ensureDataDirectory();
    app.listen(PORT, () => {
        console.log(`✅ MechCare Backend Server running on http://localhost:${PORT}`);
        console.log(`📊 API available at http://localhost:${PORT}/api`);
        console.log(`🌐 Frontend available at http://localhost:${PORT}/index.html`);
    });
}

startServer();
