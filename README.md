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
export default function App() {
	return (
		<View>
			<Test />
			<Snackbar />
		</View>
	);
}
```

Import addMessage into other components (or in the App)

```javascript
import { addMessage } from '@ouroboros/react-native-snackbar';
```

Add messages from other components

```javascript
export default function Test(props) {
	return (
		<View>
			<TouchableOpacity onPress={() => addMessage('Hello!')}>
				<Text>Click Me!</Text>
			</TouchableOpacity>
		</View>
	);
}
```

### addMessage

The addMessage function can be passed a single string, resulting in the default
duration with no action, or it can be passed the following structure

```typescript
{
    text: string;
    duration?: number;
    action?: {
        text: string;
        onPress: () => void;
	}
}
```

Duration is milliseconds (1000 = 1 second) before the popup disappears, default is 1000.

Action is an additional touchable opacity, added on the right hand side of the popup, which will call the onPress callback if pressed.