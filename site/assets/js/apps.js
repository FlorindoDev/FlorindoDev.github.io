const apps = {
    "my-projects": {
        id: "my-projects",
        title: "My Projects",
        icon: "fa-solid fa-folder-open",
        type: "folder",
        content: [
            {
                id: "dietiestates25",
                name: "DietiEstates25",
                icon: "fa-solid fa-folder",
                type: "project-folder",
                date: "Nov 12, 2024",
                meta: {
                    description: "A comprehensive project involving Flutter for the mobile/GUI part and Java for MicroServices. It includes integration with SonarQube for code quality.",
                    techStack: ["Dart", "Java", "Spring Boot", "Docker", "SonarQube"],
                    features: ["Microservices Architecture", "Flutter Cross-Platform App", "Quality Assurance"],
                    githubUrl: "https://github.com/FlorindoDev/DietiEstates25"
                },
                content: [
                    { name: "README.md", icon: "fa-solid fa-file-invoice", type: "file" },
                    { name: "docker-compose.yml", icon: "fa-solid fa-file-code", type: "file" },
                    { name: "microservices", icon: "fa-solid fa-folder", type: "folder" },
                    { name: "mobile_app", icon: "fa-solid fa-folder", type: "folder" }
                ]
            },
            {
                id: "mememuseum",
                name: "MemeMuseum",
                icon: "fa-solid fa-folder",
                type: "project-folder",
                date: "Oct 24, 2024",
                meta: {
                    description: "Full-stack application for sharing, voting, and commenting on memes. Features a modern frontend and a Dockerized backend.",
                    techStack: ["Angular", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
                    features: ["Meme Upload & Voting", "User Profiles", "Interactive Comments"],
                    githubUrl: "https://github.com/FlorindoDev/MemeMuseum"
                },
                content: [
                    { name: "README.md", icon: "fa-solid fa-file-invoice", type: "file" },
                    { name: "src", icon: "fa-solid fa-folder", type: "folder" },
                    { name: "package.json", icon: "fa-brands fa-npm", type: "file" },
                    { name: ".env.example", icon: "fa-solid fa-file", type: "file" }
                ]
            },
            {
                id: "asd-lab",
                name: "Algoritmi e Strutture Dati",
                icon: "fa-solid fa-folder",
                type: "project-folder",
                date: "Sep 10, 2024",
                meta: {
                    description: "Implementation of core data structures and algorithms in C++: Vectors, Lists, Stacks, Queues, BSTs, HashMaps.",
                    techStack: ["C++", "Makefile", "Data Structures", "Algorithms"],
                    features: ["Standard Template Library (STL) Clone", "Performance Optimized", "Unit Tests"],
                    githubUrl: "https://github.com/FlorindoDev/Laboratorio-Algoritmi-e-Strutture-dati-"
                },
                content: [
                    { name: "README.md", icon: "fa-solid fa-file-invoice", type: "file" },
                    { name: "main.cpp", icon: "fa-solid fa-file-code", type: "file" },
                    { name: "include", icon: "fa-solid fa-folder", type: "folder" },
                    { name: "Makefile", icon: "fa-solid fa-file", type: "file" }
                ]
            },
            {
                id: "pasticceria-giuliano",
                name: "Pasticceria Giuliano",
                icon: "fa-solid fa-folder",
                type: "project-folder",
                date: "Aug 15, 2024",
                meta: {
                    description: "Full-stack E-commerce for a pastry shop. Angular 20 frontend + Node.js/Express backend with Stripe payments.",
                    techStack: ["Angular", "Node.js", "Express", "Stripe", "Tailwind CSS"],
                    features: ["Online Ordering", "Stripe Payments", "Admin Dashboard"],
                    githubUrl: "https://github.com/FlorindoDev/Pasticceria-Giuliano-Web-site"
                },
                content: [
                    { name: "README.md", icon: "fa-solid fa-file-invoice", type: "file" },
                    { name: "backend", icon: "fa-solid fa-folder", type: "folder" },
                    { name: "frontend", icon: "fa-solid fa-folder", type: "folder" },
                    { name: "Dockerfile", icon: "fa-brands fa-docker", type: "file" }
                ]
            },
            {
                id: "telefonosenzafili",
                name: "TelefonoSenzaFili",
                icon: "fa-solid fa-folder",
                type: "project-folder",
                date: "Jan 12, 2024",
                meta: {
                    description: "Client-Server architecture project in C for Operating Systems course. Includes Docker support and build scripts.",
                    techStack: ["C", "System Calls", "Docker", "Shell Scripting"],
                    features: ["Multi-process Architecture", "IPC Communication", "Custom Protocol"],
                    githubUrl: "https://github.com/FlorindoDev/TelefonoSenzaFili"
                },
                content: [
                    { name: "README.md", icon: "fa-solid fa-file-invoice", type: "file" },
                    { name: "server.c", icon: "fa-solid fa-file-code", type: "file" },
                    { name: "client.c", icon: "fa-solid fa-file-code", type: "file" },
                    { name: "Makefile", icon: "fa-solid fa-file", type: "file" }
                ]
            }
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
