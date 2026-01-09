const apps = {
    "my-projects": {
        id: "my-projects",
        title: "My Projects",
        icon: "fa-solid fa-folder-open",
        type: "folder",
        content: [
            { name: "E-commerce", icon: "fa-solid fa-folder", type: "folder", date: "Oct 24, 2023" },
            { name: "Portfolio OS", icon: "fa-solid fa-folder", type: "folder", date: "Oct 20, 2023" },
            { name: "AI Chatbot", icon: "fa-solid fa-folder", type: "folder", date: "Sep 15, 2023" },
            { name: "Task Manager", icon: "fa-solid fa-folder", type: "folder", date: "Aug 02, 2023" },
            { name: "Weather App", icon: "fa-solid fa-folder", type: "folder", date: "Jul 12, 2023" },
            { name: "Crypto Tracker", icon: "fa-solid fa-folder", type: "folder", date: "Jun 28, 2023" }
        ]
    },
    "resume": {
        id: "resume",
        title: "Resume.pdf",
        icon: "fa-solid fa-file-pdf",
        type: "file",
        content: "<div style='padding: 20px; text-align: center;'><h2>Resume Viewer</h2><p>This is a placeholder for the PDF Resume viewer.</p><button style='padding: 10px 20px; margin-top: 20px; background: #0078d4; border: none; color: white; border-radius: 4px; cursor: pointer;'>Download PDF</button></div>"
    },
    "about-me": {
        id: "about-me",
        title: "About Me.txt",
        icon: "fa-solid fa-file-lines",
        type: "file",
        content: "<div style='padding: 20px; line-height: 1.6;'><h2>About Me</h2><p>Hi, I am Florindo! I am a passionate developer building cool things on the web.</p><p>This portfolio is designed to look like a desktop operating system. Feel free to explore!</p></div>"
    },
    "terminal": {
        id: "terminal",
        title: "Terminal",
        icon: "fa-solid fa-terminal",
        type: "app",
        content: "<div style='padding: 10px; font-family: monospace; color: #0f0;'>C:\\Users\\Guest> <span class='cursor'>_</span></div>"
    },
    "recycle-bin": {
        id: "recycle-bin",
        title: "Recycle Bin",
        icon: "fa-solid fa-trash-can",
        type: "app",
        content: "<div style='padding: 20px; text-align: center;'><p>The recycle bin is empty.</p></div>"
    }
};
