# Prizm Browser

A modern web browser built with Electron, featuring auto-update functionality.

## Features

- Clean, minimalist interface
- Navigation controls (back, forward, refresh)
- Address bar with URL validation
- Auto-update functionality
- Cross-platform support (Windows, macOS, Linux)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohit1465/Browser.git
   cd Browser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application in development mode:
   ```bash
   npm start
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

This will create installers for your current platform in the `dist` directory.

## Auto-Update Configuration

This browser includes auto-update functionality that works out of the box. When you create a new release on GitHub, users will be automatically notified of the update and can install it with a single click.

### How to Release a New Version

1. Make your code changes
2. Run the version bump script:
   ```bash
   npm run publish:version
   ```
   This will:
   - Ask you to select the version bump type (major/minor/patch)
   - Update the version in package.json
   - Create a git tag
   - Push the changes to GitHub

3. GitHub Actions will automatically:
   - Build the application for all platforms (Windows, macOS, Linux)
   - Create a new release with the version tag
   - Upload the installers as release assets

### How Users Get Updates

- The browser checks for updates on startup
- When an update is available, users will see a notification
- The update will be downloaded automatically in the background
- Users will be prompted to restart the browser to apply the update

1. Create a new GitHub repository for your browser
2. Update the `publish` section in `package.json` with your repository details:
   ```json
   "publish": [
     {
       "provider": "github",
       "owner": "yourusername",
       "repo": "prizm-browser"
     }
   ]
   ```
3. Set up a GitHub Personal Access Token with `repo` scope and add it as a secret in your CI/CD pipeline

## Development

### Project Structure

- `main.js` - Main Electron process
- `index.html` - Main application window
- `package.json` - Project configuration and dependencies

### Available Scripts

- `npm start` - Start the application in development mode
- `npm run build` - Build the application for production
- `npm run publish` - Publish a new release (requires GitHub token)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
