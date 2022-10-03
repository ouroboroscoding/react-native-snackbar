/**
 * React Native Snackbar
 *
 * Displays a hovering popup message to notify users of something happening
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-09-21
 */
// NPM Imports
import { afindi, random } from '@ouroboros/tools';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Constants
const DEFAULT_DURATION = 1000;
const MAX_WIDTH = 340;
// Only one Snackbar is allowed in any app, we keep track of it here
let Instance = null;
/**
 * Add Message
 *
 * Adds a message to the Snackbar display
 *
 * @name addMessage
 * @access public
 * @param {String|Object} options The options on the message, if passed a string assumes no options and just uses the value as the message
 * @returns void
 */
export function addMessage(options) {
    // If we have no instance
    if (Instance === null) {
        throw new Error('Snackbar must be added to your app in order to add a message.');
    }
    // Send the message to the snackbar
    Instance.addMessage(options);
}
/**
 * Snackbar
 *
 * Manages the popups/notifications
 *
 * @name Snackbar
 * @access public
 * @extends React.Component
 */
export class Snackbar extends React.Component {
    // Default props for Snackbar
    static defaultProps = {
        actionStyle: {
            color: '#f0f0f0',
            padding: 10
        },
        attachTo: 'bottom',
        messageStyle: {
            backgroundColor: '#222222',
            borderWidth: 1,
            borderColor: '#cecece',
            padding: 10,
            shadowColor: '#222222',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 50
        },
        textStyle: {
            color: '#f0f0f0'
        },
        zIndex: 100
    };
    // Initial state of Snackbar
    state = {
        messages: [],
    };
    // Constructs the Snackbar instance and returns it
    constructor(props) {
        super(props);
        // Bind methods
        this.action = this.action.bind(this);
        this.remove = this.remove.bind(this);
    }
    componentDidMount() {
        if (Instance) {
            throw new Error('Can only mount one instance of Snackbar');
        }
        else {
            Instance = this;
        }
    }
    componentWillUnmount() {
        if (Instance) {
            Instance = null;
        }
    }
    // Called when an action is pressed
    action(id, callback) {
        // Remove the message so it can't be clicked on again
        this.remove(id);
        // Call the action callback
        callback();
    }
    // Called by module addMessage to add a message to the state
    addMessage(options) {
        // Copy the current state items
        const items = [...this.state.messages];
        // Generate a unique ID for the message
        let id;
        let index;
        do {
            id = random(8, ['0x']);
            index = afindi(this.state.messages, '_id', id);
        } while (index > -1);
        // Get the timeout duration
        let timeout = DEFAULT_DURATION;
        // If we have a string
        if (typeof options === 'string') {
            items.push({
                _id: id,
                text: options
            });
        }
        else {
            const message = {
                _id: id,
                text: options.text
            };
            if (options.action) {
                message.action = options.action;
            }
            items.push(message);
            timeout = options.duration || DEFAULT_DURATION;
        }
        // Set the new state
        this.setState({ messages: items });
        // Add a timer to remove the message when the duration is done
        setTimeout(() => {
            this.remove(id);
        }, timeout);
    }
    // Called to remove a message
    remove(id) {
        const index = afindi(this.state.messages, '_id', id);
        if (index > -1) {
            const items = [...this.state.messages];
            items.splice(index, 1);
            this.setState({ messages: items });
        }
    }
    // Renders the component
    render() {
        // Get the window dimensions
        const window = Dimensions.get('window');
        // Generate the additional styles based on props and dimensions
        const scontainer = { zIndex: this.props.zIndex };
        const smessage = {};
        if (this.props.attachTo === 'bottom') {
            scontainer.bottom = 10;
            smessage.marginTop = 10;
        }
        else {
            scontainer.top = 10;
            smessage.marginBottom = 10;
        }
        if (window.width < 360) {
            scontainer.left = 10;
            scontainer.right = 10;
        }
        else {
            const offset = (window.width - MAX_WIDTH) / 2;
            scontainer.left = offset;
            scontainer.right = offset;
        }
        // If we have no messages
        if (this.state.messages.length === 0) {
            return null;
        }
        // Return the component
        return (<View style={[styles.container, scontainer]}>
                {this.state.messages.map((message) => <View key={message._id} style={[this.props.messageStyle, styles.message, smessage]}>
                        <View style={styles.text}>
                            <Text style={this.props.textStyle}>{message.text}</Text>
                        </View>
                        {message.action !== undefined &&
                    <View style={styles.action}>
                                <TouchableOpacity onPress={() => this.action(message._id, message.action.onPress)}>
                                    <Text style={this.props.actionStyle}>{message.action.text}</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>)}
            </View>);
    }
}
// Styles
const styles = StyleSheet.create({
    action: {
        flexGrow: 0
    },
    container: {
        backgroundColor: 'transparent',
        position: 'absolute',
    },
    message: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        flexGrow: 1
    }
});
