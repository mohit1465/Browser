const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// Configure logging
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Configure auto-update settings
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

exports.checkForUpdates = () => {
    // Check for updates
    autoUpdater.checkForUpdatesAndNotify();
    
    // Check for updates every hour
    setInterval(() => {
        autoUpdater.checkForUpdatesAndNotify();
    }, 60 * 60 * 1000);
};

// Event handlers
autoUpdater.on('checking-for-update', () => {
    log.info('Checking for updates...');});

autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info.version);
});

autoUpdater.on('update-not-available', (info) => {
    log.info('No updates available');
});

autoUpdater.on('error', (err) => {
    log.error('Error in auto-updater:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
    logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`;
    logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`;
    log.info(logMessage);
});

autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded; will install now');
});
