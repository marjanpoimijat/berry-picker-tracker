<div align="center">
  <a href="https://github.com/marjanpoimijat">
    <img
        alt="Berry Picker Tracker logo"
        height=150
        src="https://raw.githubusercontent.com/marjanpoimijat/berry-picker-tracker-docs/main/docs/images/logo.png"
        title="Berry Picker Tracker logo"
        width=150
    />
  </a>
  <h1>
    <a href="https://github.com/marjanpoimijat">
      Berry Picker Tracker
    </a>
  </h1>
</div>

# Application

<img
  alt="Screenshot of various menus of the application"
  height="75%"
  src="https://raw.githubusercontent.com/marjanpoimijat/berry-picker-tracker-docs/main/docs/images/screenshots/screenshot.png"
  title="Various menus of the application"
  width="75%"
/>

The Berry Picker Tracker application running on a Pixel 6 Pro device.

## Installation

### Installation Script

There is a [script](https://github.com/marjanpoimijat/berry-picker-tracker-docs/blob/main/docs/scripts/install.sh) for automating the installation process for both the frontend and the backend. You can find the [instructions](https://github.com/marjanpoimijat/berry-picker-tracker-docs/blob/main/docs/installation.md) in the official Berry Picker Tracker documentation.

### Manual Set-up

```bash
$ npm install
```

Create a .env-file to the project root with following:

```bash
URI=<server-address>
```

e.g. `URI="https://ohtup-staging.cs.helsinki.fi/bpt-stage"` / `URI="http://10.0.2.2:8008"` (address for Android emulator)

### Requirements

- `node:^16.17.0`
- `npm:^8.19.0`

The recommended way to set up node and npm is by using [nvm](https://github.com/nvm-sh/nvm).

## Usage

### Running

Use the following command to start the application:

```bash
$ npm start
```

### Instructions for Berry-Picker-Tracker Mobile App for IOS/Android

#### Prerequisites:

- [Berry-picker-tracker frontend](https://github.com/marjanpoimijat/berry-picker-tracker) (this repository) repository working on your computer.

#### Instructions:

1. Install **Expo Go** app from the Apple **App Store** or Android **Play Store**. Expo Go is a smartphone application for running mobile apps that are in development on a mobile device.
2. Launch **Expo Go** app on your IOS/Android device.
3. Login or Create an Expo account.
4. Connect your IOS/Android device to your computer using usb-cable.
5. Make sure that your IOS/Android device and your computer are connected to the same network.
6. On your computer in the Berry-picker-tracker frontend repository run the command:

```bash
$ npm start
```

6. A QR code should be displayed. Open the default camera app on your IOS/Android device and scan the QR code.
7. On your IOS device Expo Go should open and promt you to choose between **Development Build** or **Expo Go**. Choose **Expo Go**.

Congratulations! The Berry Picker Tracker mobile application should now be launched on your iOS/Android device.

### Running the app in an Android emulator on Cubbli/Ubuntu

1. Install the Android SDK.

```bash
# Install Android SDK
$ sudo apt install android-sdk

# Add the path to the sdk to .bashrc
# Make sure the path is correct
$ echo 'export ANDROID_HOME="$HOME/Android/Sdk"' >> .bashrc
```

2. Download and install Android Studio by following [the instructions](https://developer.android.com/studio/install#linux).

3. Set up an emulator by following [the instructions](https://docs.expo.dev/workflow/android-studio-emulator).

   - Pixel 6 Pro was used as the device
   - Android 13.0 (API 33) was used as the operating system

4. Keep Android Studio and the emulator open while running the frontend.

### Linting

Eslint is run automatically when committing changes. For manual linting use the following command in the root directory.

```bash
$ npx eslint src/**
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

[Licenses](https://github.com/marjanpoimijat/berry-picker-tracker/tree/main/licenses)
