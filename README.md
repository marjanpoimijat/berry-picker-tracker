# Berry Picker Tracker mobile app

## Installation

### Requirements

- `node:^16.17.0`
- `npm:^8.19.0`

The recommended way to set up node and npm is by using [nvm](https://github.com/nvm-sh/nvm).

### Set-up

```bash
npm install
```

Create a .env-file to the project root with following:

```bash
URI=<server-address>
```

e.g. `URI="https://berry-picker-tracker.cs.helsinki.fi"` / `URI="http://10.0.2.2:8000"` (address for Android emulator)

## Usage

use the following command to start the application:
```bash
npm start
```

### Running the app in an Android emulator on Cubbli/Ubuntu

1. Install the Android SDK.

```bash
# Install Android SDK
$ sudo apt install android-sdk

# Add the path to the sdk to .bashrc
# Make sure the path is correct
$ echo 'export ANDROID_HOME="$HOME/Android/Sdk"' >> .bashrc
```

2. Install Android Studio by following [the instructions](https://developer.android.com/studio/install#linux).

3. Set up an emulator by following [the instructions](https://docs.expo.dev/workflow/android-studio-emulator).
    - Pixel 6 Pro was used as the device
    - Android 13.0 (API 33) was used as the operating system

4. Keep Android Studio and the emulator open while running the frontend.

### Lint

Eslint is run automatically when committing changes. For manual linting use the following command in the root directory.

```bash
npx eslint src/**
```

### Recommended editor tooling (VSCode)

Install the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

Open your user settings and add the following:

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode"
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll": true
	}
}
```
## Licences
[Licenses](https://github.com/hy-ohtu-syksy-22-bpt/berry-picker-tracker/tree/main/licenses)

## General Information about the App
[App Documentation](https://github.com/hy-ohtu-syksy-22-bpt/berry-picker-tracker-docs/blob/main/README.md)
