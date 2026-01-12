class OperatingSystem {
    constructor() {

        // DOM Elements
        this.desktopAndIcons = document.getElementById('desktop-icons-container');
        this.clockElement = document.getElementById('clock');
        this.startBtn = document.getElementById('start-btn');
    }

    init() {
        this.renderDesktopIcons();
        this.startClock();
        this.setupEventListeners();
        this.windowMenager = new WindowMenager();
    }

    setupEventListeners() {
        // Start Menu Toggle (Visual only for now)
        this.startBtn.addEventListener('click', () => {
            this.startBtn.classList.toggle('active');
        });
    }

    renderDesktopIcons() {
        this.desktopAndIcons.innerHTML = '';
        Object.values(apps).forEach(app => {
            const icon = document.createElement('div');
            icon.className = 'desktop-icon';
            icon.dataset.id = app.id;
            icon.innerHTML = `
                <i class="${app.icon}" style="color: ${this.getIconColor(app.icon)}"></i>
                <span>${app.title}</span>
            `;

            icon.addEventListener('click', () => {
                // Deselect others
                document.querySelectorAll('.desktop-icon').forEach(el => el.classList.remove('selected'));
                icon.classList.add('selected');
            });

            icon.addEventListener('dblclick', () => {
                this.windowMenager.openWindow(app.id);
            });

            this.desktopAndIcons.appendChild(icon);
        });
    }

    getIconColor(iconClass) {
        if (iconClass.includes('fa-folder')) return '#fce158';
        if (iconClass.includes('fa-file-pdf')) return '#ff5f57';
        if (iconClass.includes('fa-file-lines')) return '#87ceeb';
        if (iconClass.includes('fa-terminal')) return '#28c840';
        if (iconClass.includes('fa-trash')) return '#ccc';
        return '#fff';
    }

    startClock() {
        const update = () => {
            const now = new Date();
            this.clockElement.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };
        update();
        setInterval(update, 1000);
    }
}
