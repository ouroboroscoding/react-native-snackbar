import { Snackbar } from '@ouroboros/react-native-snackbar';
import { View } from 'react-native';
import Test from './test';

export default function App() {
	return (
		<View>
			<Test />
			<Snackbar />
		</View>
	);
}