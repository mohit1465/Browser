const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const log = require('electron-log');
const path = require('path');
const { checkForUpdates } = require('./update');

// Configure logging
log.transports.file.level = 'info';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        },
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#ffffff'
        }
    });

    mainWindow.loadFile('index.html');
    
    // Open external links in default browser
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Initialize auto-update
    checkForUpdates();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// Handle restart request from renderer
ipcMain.on('restart_app', () => {
    // The update will be installed automatically on app quit
    app.quit();
});
