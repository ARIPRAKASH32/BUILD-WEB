# MechCare Backend - Complete Setup Guide

## ✅ What I Created

I've created a complete backend server for your MechCare application with the following files:

### Backend Files:
1. **`server.js`** - Main Express.js server with REST API
2. **`package.json`** - Node.js dependencies configuration
3. **`js/api.js`** - Frontend API client for communicating with backend
4. **`README-BACKEND.md`** - Detailed backend documentation
5. **`.gitignore`** - Git ignore file for backend files

## 📋 Backend Features

### REST API Endpoints:
- ✅ `GET /api/machines` - Get all machines
- ✅ `GET /api/machines/:id` - Get specific machine
- ✅ `POST /api/machines` - Add new machine
- ✅ `PUT /api/machines/:id` - Update machine
- ✅ `DELETE /api/machines/:id` - Delete machine
- ✅ `GET /api/machines/:id/logs` - Get machine logs
- ✅ `POST /api/logs` - Add log entry
- ✅ `GET /api/data` - Export all data
- ✅ `POST /api/data` - Import all data

### Data Storage:
- Data is saved to `data/mechcare-data.json` file
- Automatic file creation and directory management
- JSON format for easy backup and migration

## 🚀 How to Install and Run

### Step 1: Install Node.js
1. Download Node.js from: https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. Run the installer and follow the instructions
4. Restart your terminal/command prompt after installation

### Step 2: Verify Installation
Open a new terminal and run:
```bash
node --version
npm --version
```
You should see version numbers for both commands.

### Step 3: Install Dependencies
Navigate to your mechcare folder and run:
```bash
cd c:/Users/adadmin/mechcare
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-Origin Resource Sharing support
- `nodemon` - Auto-restart during development (optional)

### Step 4: Start the Backend Server

**Production Mode:**
```bash
npm start
```

**Development Mode (with auto-restart):**
```bash
npm run dev
```

You should see:
```
✅ MechCare Backend Server running on http://localhost:3000
📊 API available at http://localhost:3000/api
🌐 Frontend available at http://localhost:3000/index.html
```

### Step 5: Access Your Application
Open your browser and go to:
```
http://localhost:3000/index.html
```

## 🔄 Current vs Backend Architecture

### Current (localStorage):
```
Browser → localStorage (client-side only)
```
- Data stored in browser
- Lost when browser cache is cleared
- Cannot share data between devices

### With Backend:
```
Browser → API → Server → JSON File
```
- Data stored on server
- Persistent and backed up
- Can be accessed from multiple devices
- Ready for database upgrade

## 📝 Next Steps to Integrate Backend

To make your frontend use the backend instead of localStorage:

### Option 1: Quick Test (Recommended First)
1. Start the backend server: `npm start`
2. Open http://localhost:3000/index.html
3. Test the API using browser console:
```javascript
// Test API
MechCareAPI.getAllMachines().then(console.log);
```

### Option 2: Full Integration
Modify `js/main.js` to use `MechCareAPI` instead of localStorage:

**Before (localStorage):**
```javascript
const machines = JSON.parse(localStorage.getItem('mechcare_data'))?.machines || [];
```

**After (Backend API):**
```javascript
const machines = await MechCareAPI.getAllMachines();
```

## 🔧 Testing the Backend

### Test with Browser Console:
```javascript
// Add a machine
await MechCareAPI.addMachine({
    name: "Test Machine",
    type: "CNC",
    interval: 30,
    lastMaintenance: "2025-12-05",
    userName: "John Doe",
    mobileNumber: "+91 98765 43210",
    runtimeHours: 0
});

// Get all machines
const machines = await MechCareAPI.getAllMachines();
console.log(machines);

// Delete a machine
await MechCareAPI.deleteMachine(machines[0].id);
```

### Test with Postman or curl:
```bash
# Get all machines
curl http://localhost:3000/api/machines

# Add a machine
curl -X POST http://localhost:3000/api/machines \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","type":"CNC","interval":30}'
```

## 📁 File Structure

```
mechcare/
├── server.js              # Backend server
├── package.json           # Dependencies
├── .gitignore            # Git ignore
├── README-BACKEND.md     # This file
├── data/                 # Created automatically
│   └── mechcare-data.json
├── js/
│   ├── main.js          # Frontend logic (current)
│   ├── api.js           # API client (new)
│   └── ai.js
├── css/
│   └── style.css
└── *.html               # Frontend pages
```

## 🎯 Benefits of Backend

1. **Data Persistence** - Data survives browser cache clearing
2. **Multi-Device Access** - Access from any device on network
3. **Backup & Export** - Easy data backup and migration
4. **Scalability** - Ready to add database, authentication, etc.
5. **API Ready** - Can build mobile app using same API
6. **Professional** - Industry-standard architecture

## ⚠️ Important Notes

1. **Port 3000**: Make sure port 3000 is not used by another application
2. **Server Must Run**: The backend server must be running for the app to work
3. **Data Migration**: Your current localStorage data won't automatically transfer to the backend
4. **Development**: Use `npm run dev` during development for auto-restart

## 🔐 Future Enhancements

Once the backend is working, you can add:
- ✅ User authentication (login/register)
- ✅ Database (MongoDB, PostgreSQL)
- ✅ File uploads (machine photos, documents)
- ✅ Email notifications for maintenance
- ✅ Real-time updates (WebSockets)
- ✅ Mobile app (React Native, Flutter)
- ✅ Cloud deployment (AWS, Azure, Heroku)

## 🆘 Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Solution: Install Node.js from https://nodejs.org/

### "Port 3000 is already in use"
- Another application is using port 3000
- Solution: Change PORT in server.js to 3001 or another port

### "Cannot GET /api/machines"
- Server is not running
- Solution: Run `npm start` in the mechcare directory

### CORS errors
- Accessing from file:// instead of http://
- Solution: Access via http://localhost:3000/index.html

## 📞 Need Help?

If you encounter any issues:
1. Check that Node.js is installed: `node --version`
2. Check that dependencies are installed: `npm list`
3. Check server logs for error messages
4. Verify the server is running on http://localhost:3000

---

**Created by**: Antigravity AI Assistant
**Date**: December 5, 2025
**Version**: 1.0.0
