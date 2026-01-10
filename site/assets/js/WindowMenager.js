class WindowMenager {
    constructor() {
        this.windows = {};
        this.activeWindow = null;
        this.zIndexCounter = 100;

        this.windowLayer = document.getElementById('window-layer');
        this.taskbarApps = document.getElementById('taskbar-apps');

        this.openWindow('my-projects');
    }

    ////////////////////////////////////////////////////////////////
    //                          TaskBar                           //
    ////////////////////////////////////////////////////////////////

    addToTaskbar(app) {
        const item = document.createElement('div');
        item.className = 'taskbar-app active';
        item.dataset.id = app.id;
        item.title = app.title;
        item.innerHTML = `<i class="${app.icon}"></i>`;

        item.addEventListener('click', () => {
            const win = this.windows[app.id].element;
            if (win.classList.contains('minimized')) {
                this.restoreWindow(app.id);
            } else if (this.activeWindow === app.id) {
                this.minimizeWindow(app.id);
            } else {
                this.focusWindow(app.id);
            }
        });

        this.taskbarApps.appendChild(item);
    }

    removeFromTaskbar(appId) {
        const item = document.querySelector(`.taskbar-app[data-id="${appId}"]`);
        if (item) item.remove();
    }

    ////////////////////////////////////////////////////////////////
    //                          Windows                           //
    ////////////////////////////////////////////////////////////////

    addWindowListeners(win, appId) {
        const header = win.querySelector('.window-header');
        const closeBtn = win.querySelector('.btn-close');
        const minBtn = win.querySelector('.btn-min');
        const maxBtn = win.querySelector('.btn-max');

        // Close
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeWindow(appId);
        });

        // Minimize
        minBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.minimizeWindow(appId);
        });

        // Maximize
        maxBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.maximizeWindow(win);
        });

        // Focus on click
        win.addEventListener('mousedown', () => {
            this.focusWindow(appId);
        });

        // Dragging
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-controls')) return; // Don't drag if clicking controls

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = win.offsetLeft;
            initialTop = win.offsetTop;

            this.focusWindow(appId);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            win.style.left = `${initialLeft + dx}px`;
            win.style.top = `${initialTop + dy}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    closeWindow(appId) {
        const win = this.windows[appId].element;
        win.remove();
        delete this.windows[appId];
        this.removeFromTaskbar(appId);
    }

    minimizeWindow(appId) {
        const win = this.windows[appId].element;
        win.classList.add('minimized');
        const taskbarItem = document.querySelector(`.taskbar-app[data-id="${appId}"]`);
        if (taskbarItem) taskbarItem.classList.remove('active');
    }

    restoreWindow(appId) {
        const win = this.windows[appId].element;
        win.classList.remove('minimized');
        this.focusWindow(appId);
    }

    maximizeWindow(win) {
        if (win.classList.contains('maximized')) {
            win.classList.remove('maximized');
            win.style.top = '50px';
            win.style.left = '50px';
            win.style.width = '';
            win.style.height = '';
        } else {
            win.classList.add('maximized');
            win.style.top = '0';
            win.style.left = '0';
            win.style.width = '100%';
            win.style.height = 'calc(100vh - 48px)';
        }
    }

    focusWindow(appId) {
        if (this.windows[appId]) {
            this.windows[appId].element.style.zIndex = this.zIndexCounter++;
            this.activeWindow = appId;

            // Taskbar active state
            document.querySelectorAll('.taskbar-app').forEach(el => el.classList.remove('active'));
            const taskbarItem = document.querySelector(`.taskbar-app[data-id="${appId}"]`);
            if (taskbarItem) taskbarItem.classList.add('active');
        }
    }


    openWindow(appId) {
        if (this.windows[appId]) {
            this.focusWindow(appId);
            if (this.windows[appId].element.classList.contains('minimized')) {
                this.restoreWindow(appId);
            }
            return;
        }

        const app = apps[appId];
        const win = document.createElement('div');
        win.className = 'window';
        win.dataset.id = appId;
        win.style.left = '90px';
        win.style.top = '90px';
        win.style.zIndex = this.zIndexCounter++;

        // Window Structure
        win.innerHTML = `
            <div class="window-header">
                <div class="window-title">
                    <i class="${app.icon}"></i> ${app.title}
                </div>
                <div class="window-controls">
                    <button class="control-btn btn-min"></button>
                    <button class="control-btn btn-max"></button>
                    <button class="control-btn btn-close"></button>
                </div>
            </div>
            <div class="window-content">
                ${this.getAppContent(app)}
            </div>
        `;

        this.windowLayer.appendChild(win);
        this.windows[appId] = {
            element: win,
            data: app
        };

        this.addWindowListeners(win, appId);
        this.addToTaskbar(app);
        this.focusWindow(appId);
    }

    getAppContent(app) {
        if (app.type === 'folder') {
            return this.renderFileExplorer(app.content);
        }
        return app.content;
    }

    renderFileExplorer(content) {
        let itemsHtml = content.map(item => `
            <div class="folder-item">
                <i class="${item.icon} folder-icon"></i>
                <div class="folder-name">${item.name}</div>
            </div>
        `).join('');

        return `
            <div class="file-explorer">
                <div class="sidebar">
                    <div class="sidebar-item active"><i class="fa-solid fa-desktop"></i> Desktop</div>
                    <div class="sidebar-item"><i class="fa-solid fa-download"></i> Downloads</div>
                    <div class="sidebar-item"><i class="fa-solid fa-file"></i> Documents</div>
                    <div class="sidebar-item"><i class="fa-solid fa-image"></i> Pictures</div>
                    <div class="sidebar-item" style="margin-top: 20px;"><i class="fa-solid fa-hard-drive"></i> Local Disk (C:)</div>
                </div>
                <div class="folder-grid">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }



}