# MECHCARE - Mechanical Maintenance Assistant

![MECHCARE Logo](https://img.shields.io/badge/MECHCARE-AI%20Powered-00f2ea?style=for-the-badge)

A premium, industrial-grade web application for managing machine maintenance schedules with AI-powered assistance.

---

## 🚀 Features

- **Dashboard**: Real-time overview of all machines with health status indicators
- **Machine Management**: Add, view, and track industrial equipment
- **Maintenance Logs**: Record and review service history
- **AI Assistant**: Get expert advice on troubleshooting, maintenance schedules, and health reports
- **Health Reports**: Generate downloadable maintenance receipts
- **Data Export/Import**: Backup and restore your data as JSON
- **Responsive Design**: Works seamlessly on desktop and mobile devices

---

## 📂 Project Structure

```
mechcare/
├── index.html              # Dashboard
├── machines.html           # Machines List
├── add-machine.html        # Add Machine Form
├── machine-details.html    # Machine Details
├── logs.html               # Maintenance Logs
├── chat.html               # AI Chat Interface
├── settings.html           # Settings & Data Management
├── css/
│   └── style.css           # Global Styles
└── js/
    ├── main.js             # Core Application Logic
    └── ai.js               # AI Functions
```

---

## 🛠 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local web server (recommended for best experience)

### Option 1: VS Code Live Server (Recommended)

1. **Install VS Code**: Download from [code.visualstudio.com](https://code.visualstudio.com/)

2. **Install Live Server Extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

3. **Run the Application**:
   - Open the `mechcare` folder in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will open at `http://127.0.0.1:5500`

### Option 2: Python HTTP Server

```bash
# Navigate to the project directory
cd mechcare

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run from project directory
cd mechcare
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

---

## 📖 Usage Guide

### Adding a Machine

1. Navigate to **Dashboard** or **Machines**
2. Click **"+ Add Machine"**
3. Fill in:
   - Machine Name (e.g., "CNC Lathe MX-200")
   - Machine Type (select from dropdown)
   - Maintenance Interval (in days)
4. Click **"Save Machine"**

### Viewing Machine Details

1. Go to **Machines** page
2. Click **"Details"** on any machine card
3. View health rating, maintenance schedule, and actions

### Adding Maintenance Logs

1. Open a machine's **Details** page
2. Click **"Maintenance Logs"**
3. Click **"+ Add Entry"**
4. Enter date and notes
5. Click **"Save Entry"**

### Using AI Assistant

1. Navigate to **AI Assistant** from the top menu
2. Type your question or use quick action buttons
3. Examples:
   - "Generate a daily checklist for a CNC Machine"
   - "My hydraulic press is making a grinding noise"
   - "How to check oil levels in a Compressor"

### Exporting/Importing Data

1. Go to **Settings** (⚙ icon in navigation)
2. Under **Data Management**:
   - **Export JSON**: Download a backup of all your data
   - **Import JSON**: Restore from a previous backup

---

## 🤖 AI Integration

The application currently uses **mock AI responses** for demonstration purposes.

### Connecting to a Real AI API

To integrate with OpenAI, Google Gemini, or other AI services:

1. Open `js/ai.js`
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Modify the `ask()` function to call your chosen API:

```javascript
async ask(query) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are an industrial maintenance expert.' },
                { role: 'user', content: query }
            ]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}
```

---

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd mechcare
   vercel
   ```

3. Follow the prompts. Your site will be live at `https://your-project.vercel.app`

### Deploy to Netlify

1. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   cd mechcare
   netlify deploy
   ```

2. **Via Netlify Web UI**:
   - Go to [netlify.com](https://www.netlify.com/)
   - Drag and drop the `mechcare` folder
   - Your site will be live instantly

### Deploy to Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   cd mechcare
   firebase login
   firebase init hosting
   ```
   - Select "Use an existing project" or create a new one
   - Set public directory to `.` (current directory)
   - Configure as single-page app: **No**
   - Don't overwrite index.html

3. **Deploy**:
   ```bash
   firebase deploy
   ```

4. Your site will be live at `https://your-project.firebaseapp.com`

---

## 🎨 Customization

### Changing Colors

Edit `css/style.css` and modify the CSS variables:

```css
:root {
  --primary: #00f2ea;      /* Neon Cyan */
  --accent: #ff9f00;       /* Industrial Orange */
  --bg-dark: #0f1218;      /* Background */
  --bg-card: #1a1f29;      /* Card Background */
}
```

### Adding New Machine Types

Edit `add-machine.html` and add options to the `<select>` dropdown:

```html
<option value="Your Machine Type">Your Machine Type</option>
```

---

## 📊 Data Storage

All data is stored locally in your browser using **localStorage**. This means:

- ✅ No server required
- ✅ Fast and private
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Clearing browser data will delete your machines

**Always export backups regularly from Settings!**

---

## 🔒 Security Notes

- The application runs entirely client-side
- No data is sent to external servers (unless you integrate a real AI API)
- API keys in `ai.js` should be kept secure
- For production use with real APIs, consider using environment variables or a backend proxy

---

## 🐛 Troubleshooting

### Machines not showing up?
- Check browser console for errors (F12)
- Ensure localStorage is enabled in your browser
- Try clearing site data and re-adding machines

### AI not responding?
- The default implementation uses mock responses
- Check `js/ai.js` for configuration
- If using a real API, verify your API key is valid

### Styling looks broken?
- Ensure you're running via a web server (not opening `index.html` directly)
- Check that `css/style.css` is loading properly
- Clear browser cache and refresh

---

## 📝 License

This project is open source and available for personal and commercial use.

---

## 🤝 Contributing

Feel free to fork, modify, and enhance this application!

Suggestions for improvements:
- Add user authentication
- Implement cloud sync
- Add push notifications for due maintenance
- Integrate with real IoT sensors
- Multi-language support

---

## 📧 Support

For issues or questions, please refer to the code comments or create an issue in your repository.

---

**Built with ❤️ for industrial maintenance professionals**

MECHCARE • SYSTEMS
