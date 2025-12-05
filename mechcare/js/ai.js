/**
 * MECHCARE - AI Assistant Module
 */

const MechCareAI = {
    apiKey: 'YOUR_API_KEY_HERE', // Placeholder

    // --- Mock AI Responses ---
    // In a real app, these would call an API

    async ask(query) {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 1000));

        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
            return "Hello! I'm your MechCare assistant. How can I help you with your machinery today?";
        }

        if (lowerQuery.includes('maintenance') || lowerQuery.includes('schedule')) {
            return "Regular maintenance is key to longevity. Please specify which machine you'd like to discuss, and I can generate a checklist for you.";
        }

        if (lowerQuery.includes('noise') || lowerQuery.includes('sound')) {
            return "**Potential Issue:** Unusual noise often indicates loose parts, lubrication failure, or bearing wear.\n\n**Recommendation:**\n1. Stop the machine immediately.\n2. Check oil levels.\n3. Inspect moving parts for debris.\n4. If the sound persists, consult the manual for bearing specifications.";
        }

        return "I can help with maintenance schedules, troubleshooting, and health reports. Could you provide a bit more detail about the machine or issue?";
    },

    async generateChecklist(machineType) {
        await new Promise(r => setTimeout(r, 1500));

        return `
### Maintenance Checklist for ${machineType}
- [ ] Inspect safety guards and emergency stops.
- [ ] Check lubrication levels and top up if necessary.
- [ ] Clean air filters and vents.
- [ ] tighten all visible bolts and vibration mounts.
- [ ] Run a 5-minute test cycle at low RPM.
        `.trim();
    },

    async generateTroubleshooting(issue) {
        await new Promise(r => setTimeout(r, 1500));
        return `**Troubleshooting Analysis:** "${issue}"\n\nBased on common failure patterns, please check:\n1. Power supply consistency.\n2. Hydraulic pressure sensors.\n3. Filter blockages.\n\nRecommended Action: Perform a visual inspection of the fluid lines.`;
    },

    generateShowroomMessage(machineName, issue) {
        return `Subject: Service Request for ${machineName}\n\nTo Whom It May Concern,\n\nWe require support for our ${machineName}. It is currently experiencing issues: "${issue || 'General Maintenance Required'}".\n\nPlease advise on the earliest available service slot.\n\nRegards,\n[Your Name]`;
    }
};
