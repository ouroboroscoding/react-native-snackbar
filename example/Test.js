import { addMessage } from '@ouroboros/react-native-snackbar';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Test(props) {
	return (
		<View>
			<TouchableOpacity onPress={() => addMessage('Hello!')}>
				<Text>Click Me!</Text>
			</TouchableOpacity>
		</View>
	);
}