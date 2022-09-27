# @ouroboros/react-native-snackbar
[![npm version](https://img.shields.io/npm/v/@ouroboros/react-native-snackbar.svg)](https://www.npmjs.com/package/@ouroboros/react-native-snackbar) ![Supports Android, iOS, Expo](https://img.shields.io/badge/platforms-android%20|%20ios%20|%20expo%20-lightgrey.svg) ![MIT License](https://img.shields.io/npm/l/@ouroboros/react-native-snackbar.svg)

A cross platform react-native-snackbar for showing user's messages and allowing them to
take an extra action, like UNDO

## Installation

react-native

```bash
npm install @ouroboros/react-native-snackbar
```

expo

```bash
expo install @ouroboros/react-native-snackbar
```

## Getting Started

Import Snackbar in your main App file

```javascript
import { Snackbar } from '@ouroboros/react-native-snackbar';
```

Add it to the app

```javascript
export default App() {

	return (
		<View>
			<Snackbar />
		</View>
	);
}
```

