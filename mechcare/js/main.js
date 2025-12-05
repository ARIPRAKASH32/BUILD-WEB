/**
 * MECHCARE - Main Application Logic
 */

const MechCare = {
    // --- Data Management ---
    data: {
        machines: [],
        logs: []
    },

    // Initialize application
    init() {
        this.loadData();
        console.log("MechCare initialized.");
    },

    // Load data from localStorage
    loadData() {
        const storedData = localStorage.getItem('mechcare_data');
        if (storedData) {
            this.data = JSON.parse(storedData);
        } else {
            // Seed initial data if empty
            this.data = {
                machines: [],
                logs: []
            };
            this.saveData();
        }
    },

    // Save current state to localStorage
    saveData() {
        localStorage.setItem('mechcare_data', JSON.stringify(this.data));
    },

    // --- Machine Operations ---
    addMachine(machine) {
        // machine: { name, userName, mobileNumber, type, lastServiceDate, interval, runtimeHours }
        const newMachine = {
            id: this.generateId(),
            name: machine.name,
            userName: machine.userName || '',
            mobileNumber: machine.mobileNumber || '',
            type: machine.type,
            interval: parseInt(machine.interval),
            runtimeHours: parseFloat(machine.runtimeHours) || 0, // Total runtime in hours
            lastMaintenance: machine.lastServiceDate || new Date().toISOString().split('T')[0],
            createdDate: new Date().toISOString()
        };
        this.data.machines.push(newMachine);
        this.saveData();
        return newMachine;
    },

    getMachine(id) {
        return this.data.machines.find(m => m.id === id);
    },

    getAllMachines() {
        return this.data.machines;
    },

    deleteMachine(id) {
        this.data.machines = this.data.machines.filter(m => m.id !== id);
        // Also cleanup logs
        this.data.logs = this.data.logs.filter(l => l.machineId !== id);
        this.saveData();
    },

    // --- Log Operations ---
    addLog(log) {
        // log: { machineId, notes, date }
        const newLog = {
            id: this.generateId(),
            machineId: log.machineId,
            notes: log.notes,
            date: log.date || new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString()
        };
        this.data.logs.push(newLog);

        // Update functionality: Adding a log usually means maintenance was done
        // So we update the machine's lastMaintenance date if the log date is newer
        const machine = this.getMachine(log.machineId);
        if (machine) {
            if (new Date(log.date) > new Date(machine.lastMaintenance)) {
                machine.lastMaintenance = log.date;
            }
        }

        this.saveData();
        return newLog;
    },

    getLogsForMachine(machineId) {
        return this.data.logs
            .filter(l => l.machineId === machineId)
            .sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    },

    // --- Utilities ---
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Calculate status: 'Healthy', 'Due Soon', 'Overdue'
    getMachineStatus(machine) {
        const today = new Date();
        const lastMaint = new Date(machine.lastMaintenance);
        const nextMaint = new Date(lastMaint);
        nextMaint.setDate(lastMaint.getDate() + machine.interval);

        const diffTime = nextMaint - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { status: 'Overdue', days: Math.abs(diffDays), color: 'danger' };
        if (diffDays <= 7) return { status: 'Due Soon', days: diffDays, color: 'warning' };
        return { status: 'Healthy', days: diffDays, color: 'success' };
    },

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Update machine runtime hours
    updateMachineRuntime(machineId, additionalHours) {
        const machine = this.getMachine(machineId);
        if (machine) {
            machine.runtimeHours = (machine.runtimeHours || 0) + parseFloat(additionalHours);
            this.saveData();
            return machine;
        }
        return null;
    },

    // Convert hours to days (24-hour day)
    hoursTodays(hours) {
        return (hours / 24).toFixed(2);
    },

    // Get machine quality based on runtime
    getMachineQuality(machine) {
        const runtimeDays = parseFloat(this.hoursTodays(machine.runtimeHours || 0));
        const maintenanceDays = machine.interval;

        // Calculate quality percentage (100% at 0 days, decreases as runtime approaches interval)
        let quality = 100;
        if (runtimeDays > 0) {
            quality = Math.max(0, 100 - (runtimeDays / maintenanceDays * 100));
        }

        return {
            quality: Math.round(quality),
            runtimeHours: machine.runtimeHours || 0,
            runtimeDays: runtimeDays,
            needsMaintenance: runtimeDays >= maintenanceDays
        };
    }
};

// Initialize on script load
MechCare.init();
