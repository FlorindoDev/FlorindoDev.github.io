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

        const startDrag = (e) => {
            if (e.target.closest('.window-controls')) return;
            if (e.target.closest('.resizer')) return; // Don't drag if clicking resizers

            // Check if touch or mouse
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            isDragging = true;
            startX = clientX;
            startY = clientY;
            initialLeft = win.offsetLeft;
            initialTop = win.offsetTop;

            this.focusWindow(appId);
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scrolling on touch

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;
            win.style.left = `${initialLeft + dx}px`;
            win.style.top = `${initialTop + dy}px`;
        };

        const stopDrag = () => {
            isDragging = false;
        };

        header.addEventListener('mousedown', startDrag);
        header.addEventListener('touchstart', startDrag, { passive: false });

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('touchmove', onDrag, { passive: false });

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    addResizeListeners(win) {
        const resizers = win.querySelectorAll('.resizer');
        let isResizing = false;
        let currentResizer = null;
        let startX, startY, startWidth, startHeight, startLeft, startTop;

        const startResize = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            isResizing = true;
            currentResizer = e.target;
            startX = clientX;
            startY = clientY;

            const rect = win.getBoundingClientRect();
            startWidth = rect.width;
            startHeight = rect.height;
            startLeft = rect.left;
            startTop = rect.top;

            // Remove transitions during resize
            win.style.transition = 'none';
        };

        const onResize = (e) => {
            if (!isResizing) return;

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            const dx = clientX - startX;
            const dy = clientY - startY;

            // Determine which resizer is active based on class
            const classList = currentResizer.classList;

            if (classList.contains('resizer-e') || classList.contains('resizer-ne') || classList.contains('resizer-se')) {
                win.style.width = `${startWidth + dx}px`;
            }

            if (classList.contains('resizer-s') || classList.contains('resizer-se') || classList.contains('resizer-sw')) {
                win.style.height = `${startHeight + dy}px`;
            }

            if (classList.contains('resizer-w') || classList.contains('resizer-nw') || classList.contains('resizer-sw')) {
                win.style.width = `${startWidth - dx}px`;
                win.style.left = `${startLeft + dx}px`;
            }

            if (classList.contains('resizer-n') || classList.contains('resizer-ne') || classList.contains('resizer-nw')) {
                win.style.height = `${startHeight - dy}px`;
                win.style.top = `${startTop + dy}px`;
            }
        };

        const stopResize = () => {
            if (isResizing) {
                isResizing = false;
                win.style.transition = ''; // Restore transition if any
            }
        };

        resizers.forEach(resizer => {
            resizer.addEventListener('mousedown', startResize);
            resizer.addEventListener('touchstart', startResize, { passive: false });
        });

        document.addEventListener('mousemove', onResize);
        document.addEventListener('touchmove', onResize, { passive: false });
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('touchend', stopResize);
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
        if (window.innerWidth < 768) {
            win.style.left = '5%';
            win.style.top = '10%';
            // Initial size handled by CSS for mobile often, but good to set default if needed
            // But CSS has !important for mobile so JS values might be overridden which is fine
        } else {
            win.style.left = '90px';
            win.style.top = '90px';
        }
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
            
            <!-- Resize Handles -->
            <div class="resizer resizer-n"></div>
            <div class="resizer resizer-e"></div>
            <div class="resizer resizer-s"></div>
            <div class="resizer resizer-w"></div>
            <div class="resizer resizer-ne"></div>
            <div class="resizer resizer-nw"></div>
            <div class="resizer resizer-se"></div>
            <div class="resizer resizer-sw"></div>
        `;

        this.windowLayer.appendChild(win);
        this.windows[appId] = {
            element: win,
            data: app
        };

        // If it's a folder, ensure listeners are attached after a short tick
        if (app.type === 'folder') {
            setTimeout(() => {
                // Re-find the element in case? No, win is ref.
                // We need to call setupExplorerListeners but likely need to handle it inside renderFileExplorer 
                // but since render returns string, we need to pass the ID.
                // Actually renderFileExplorer sets the timeout itself now.
            }, 50);
        }

        this.addWindowListeners(win, appId);
        this.addResizeListeners(win);
        this.addToTaskbar(app);
        this.focusWindow(appId);
    }

    getAppContent(app) {
        if (app.type === 'folder' || app.type === 'project-folder') {
            return this.renderFileExplorer(app);
        }
        return app.content;
    }

    renderFileExplorer(folderData) {
        const content = folderData.content || [];
        const isProject = folderData.type === 'project-folder';

        // Items Grid
        let itemsHtml = content.map((item, index) => {
            // Add click/dblclick handlers via ID later, or inline for simplicity in string
            // For now we set data attributes to handle clicks
            return `
            <div class="folder-item" data-index="${index}" data-type="${item.type}">
                <i class="${item.icon} folder-icon"></i>
                <div class="folder-name">${item.name}</div>
            </div>
            `;
        }).join('');

        // Preview Pane Content
        // Always start empty, wait for user to click README
        let previewHtml = `
            <div class="preview-empty">
                <i class="fa-brands fa-markdown" style="font-size: 48px; margin-bottom: 10px; opacity: 0.5;"></i>
                <p>Select README.md to view details</p>
            </div>
        `;

        const html = `
            <div class="file-explorer" id="explorer-${folderData.id || Date.now()}">
                <div class="sidebar">
                    <div class="sidebar-item active"><i class="fa-solid fa-desktop"></i> Desktop</div>
                     <div class="sidebar-item"><i class="fa-solid fa-folder-open"></i> My Projects</div>
                    <div class="sidebar-item"><i class="fa-solid fa-download"></i> Downloads</div>
                    <div class="sidebar-item"><i class="fa-solid fa-file"></i> Documents</div>
                    <div class="sidebar-item"><i class="fa-solid fa-image"></i> Pictures</div>
                    <div class="sidebar-item" style="margin-top: 20px;"><i class="fa-solid fa-hard-drive"></i> Local Disk (C:)</div>
                </div>
                <div class="folder-grid">
                    ${itemsHtml}
                </div>
                <div class="preview-pane">
                    ${previewHtml}
                </div>
            </div>
        `;

        // We need to attach listeners *after* rendering. 
        // Since this returns string, the caller 'openWindow' appends it.
        // We'll trust openWindow to add the logic? No, openWindow is generic.
        // We should add a small delay or use a mutation observer, OR better:
        // openWindow should call a method 'afterRender' if it exists.
        // But for now, let's delegate clicks to the window content in 'setupExplorerListeners'
        // We'll call this manually from openWindow if we detect it's a folder.

        // HACK: We can't easily attach listeners here as it returns string.
        // We'll attach a global or window-scoped listener in 'openWindow' or 'addWindowListeners' 
        // that handles .folder-item clicks dynamically.
        setTimeout(() => {
            this.setupExplorerListeners(folderData);
        }, 0);

        return html;
    }

    renderPreviewPane(data) {
        const meta = data.meta;
        const techTags = meta.techStack.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        const features = meta.features.map(feat => `<li><i class="fa-solid fa-check"></i> ${feat}</li>`).join('');

        return `
            <div class="preview-header">
                <h2>${data.name}</h2>
            </div>
            <div class="preview-desc">
                ${meta.description}
            </div>

            <div class="preview-section">
                <h3><i class="fa-solid fa-code"></i> Tech Stack</h3>
                <div class="tech-tags">
                    ${techTags}
                </div>
            </div>

            <div class="preview-section">
                <h3><i class="fa-solid fa-star"></i> Key Features</h3>
                <ul class="feature-list">
                    ${features}
                </ul>
            </div>

            <div class="preview-actions">
                <a href="${meta.githubUrl}" target="_blank" class="btn-github">
                    <i class="fa-brands fa-github"></i> View on GitHub
                </a>
            </div>
        `;
    }

    setupExplorerListeners(currentFolder) {
        // Find the active window content 
        // This is a bit tricky if we have multiple, but assuming dragging logic handles basic stuff
        // We need to find the specific explorer container.
        // Let's use the ID we generated or just find the last opened window?
        // Better: add specific listener to the generated HTML in 'openWindow' logic.

        // Revised approach: We will handle clicks in 'addWindowListeners' or by delegating to the window text.
        // But we need to know WHICH data to navigate to.

        // Let's attach the data to the DOM elements if possible, or lookup from 'apps'.

        const explorer = document.getElementById(`explorer-${currentFolder.id}`);
        if (!explorer) return; // Might not be inserted yet

        const items = explorer.querySelectorAll('.folder-item');
        const previewPane = explorer.querySelector('.preview-pane');

        items.forEach(item => {
            item.addEventListener('dblclick', (e) => {
                const index = item.dataset.index;
                const type = item.dataset.type;
                const selectedItem = currentFolder.content[index];

                // Block navigation if inside a project folder
                if (currentFolder.type === 'project-folder') {
                    return;
                }

                if (type === 'project-folder' || type === 'folder') {
                    // Navigate!
                    this.navigateTo(selectedItem, explorer.closest('.window'));
                }
            });

            item.addEventListener('click', (e) => {
                // Selection styled
                items.forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');

                // Handle Preview Logic
                const index = item.dataset.index;
                const selectedItem = currentFolder.content[index];

                // Logic: If inside project-folder AND clicked README.md -> Show Preview
                if (currentFolder.type === 'project-folder') {
                    if (selectedItem.name.toLowerCase() === 'readme.md') {
                        previewPane.innerHTML = this.renderPreviewPane(currentFolder);
                    } else {
                        // Reset to empty or maybe show generic file info?
                        previewPane.innerHTML = `
                           <div class="preview-empty">
                               <div style="text-align: center;">
                                   <i class="${selectedItem.icon}" style="font-size: 48px; margin-bottom: 10px; opacity: 0.5;"></i>
                                   <p>${selectedItem.name}</p>
                                   <span style="font-size: 12px; opacity: 0.7;">No preview available</span>
                               </div>
                           </div>
                        `;
                    }
                }
            });
        });
    }

    navigateTo(folder, windowElement) {
        // Re-render content
        const newContent = this.renderFileExplorer(folder);
        const contentArea = windowElement.querySelector('.window-content');
        if (contentArea) {
            contentArea.innerHTML = newContent;
            // Update Title
            const title = windowElement.querySelector('.window-title');
            title.innerHTML = `<i class="${folder.icon}"></i> ${folder.name}`;
        }
    }



}