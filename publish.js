const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { prompt } = require('enquirer');

// Get current version from package.json
const packageJson = require('./package.json');
let [major, minor, patch] = packageJson.version.split('.').map(Number);

async function publish() {
    try {
        // Ask for version bump type
        const { bumpType } = await prompt({
            type: 'select',
            name: 'bumpType',
            message: 'Select version bump type:',
            choices: [
                { name: 'major', message: `Major (${major + 1}.0.0)` },
                { name: 'minor', message: `Minor (${major}.${minor + 1}.0)` },
                { name: 'patch', message: `Patch (${major}.${minor}.${patch + 1})` },
            ]
        });

        // Update version
        let newVersion;
        switch (bumpType) {
            case 'major':
                major++;
                minor = 0;
                patch = 0;
                break;
            case 'minor':
                minor++;
                patch = 0;
                break;
            case 'patch':
                patch++;
                break;
        }
        newVersion = `${major}.${minor}.${patch}`;

        // Update package.json
        packageJson.version = newVersion;
        fs.writeFileSync(
            path.join(__dirname, 'package.json'),
            JSON.stringify(packageJson, null, 2) + '\n'
        );

        console.log(`Updated version to v${newVersion}`);

        // Commit changes
        execSync('git add package.json');
        execSync(`git commit -m "chore: bump version to v${newVersion}"`);
        
        // Create tag
        execSync(`git tag -a v${newVersion} -m "v${newVersion}"`);
        
        // Push changes and tags
        execSync('git push');
        execSync('git push --tags');
        
        console.log('\x1b[32m%s\x1b[0m', 'Successfully published new version!');
        console.log('GitHub Actions will now build and release the new version.');
        
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', 'Error during publish:', error.message);
        process.exit(1);
    }
}

publish();
