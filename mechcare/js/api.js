// API Client for MechCare Backend
const API_BASE_URL = 'http://localhost:3000/api';

const MechCareAPI = {
    // Get all machines
    async getAllMachines() {
        try {
            const response = await fetch(`${API_BASE_URL}/machines`);
            if (!response.ok) throw new Error('Failed to fetch machines');
            return await response.json();
        } catch (error) {
            console.error('Error fetching machines:', error);
            return [];
        }
    },

    // Get single machine
    async getMachine(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/machines/${id}`);
            if (!response.ok) throw new Error('Machine not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching machine:', error);
            return null;
        }
    },

    // Add new machine
    async addMachine(machineData) {
        try {
            const response = await fetch(`${API_BASE_URL}/machines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machineData)
            });
            if (!response.ok) throw new Error('Failed to add machine');
            return await response.json();
        } catch (error) {
            console.error('Error adding machine:', error);
            return null;
        }
    },

    // Update machine
    async updateMachine(id, machineData) {
        try {
            const response = await fetch(`${API_BASE_URL}/machines/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machineData)
            });
            if (!response.ok) throw new Error('Failed to update machine');
            return await response.json();
        } catch (error) {
            console.error('Error updating machine:', error);
            return null;
        }
    },

    // Delete machine
    async deleteMachine(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/machines/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete machine');
            return await response.json();
        } catch (error) {
            console.error('Error deleting machine:', error);
            return null;
        }
    },

    // Get logs for a machine
    async getLogsForMachine(machineId) {
        try {
            const response = await fetch(`${API_BASE_URL}/machines/${machineId}/logs`);
            if (!response.ok) throw new Error('Failed to fetch logs');
            return await response.json();
        } catch (error) {
            console.error('Error fetching logs:', error);
            return [];
        }
    },

    // Add log entry
    async addLog(logData) {
        try {
            const response = await fetch(`${API_BASE_URL}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logData)
            });
            if (!response.ok) throw new Error('Failed to add log');
            return await response.json();
        } catch (error) {
            console.error('Error adding log:', error);
            return null;
        }
    },

    // Get all data (for export)
    async getAllData() {
        try {
            const response = await fetch(`${API_BASE_URL}/data`);
            if (!response.ok) throw new Error('Failed to fetch data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return { machines: [], logs: [] };
        }
    },

    // Save all data (for import)
    async saveAllData(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Failed to save data');
            return await response.json();
        } catch (error) {
            console.error('Error saving data:', error);
            return null;
        }
    }
};
