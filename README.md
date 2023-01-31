# Berry Picker Tracker mobile app

## Installation

### Requirements

- `node:^16.17.0`
- `npm:^8.19.0`

### Set-up

```bash
npm install
```

Create a .env-file to the project root with following:

```bash
URI=<server-address>
```

e.g. `URI="https://berry-picker-tracker.cs.helsinki.fi"` / `URI="http://10.0.2.2:8000"` (address for Android emulator)

### Running

```bash
npm start
```
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
