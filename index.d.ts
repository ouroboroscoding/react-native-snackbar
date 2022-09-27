/**
 * React Native Snackbar
 *
 * Displays a hovering popup message to notify users of something happening
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2022-09-21
 */
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
/**
 * Generic types
 */
declare type SnackbarMessageActionOnPress = () => void;
declare type SnackbarMessageAction = {
    text: string;
    onPress: SnackbarMessageActionOnPress;
};
declare type SnackbarMessage = {
    text: string;
    duration?: number;
    action?: SnackbarMessageAction;
};
declare type SnackbarMessageState = {
    _id: string;
    text: string;
    action?: SnackbarMessageAction;
};
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
export declare function addMessage(options: string | SnackbarMessage): void;
/**
 * Snackbar types
 */
declare type SnackbarProps = typeof Snackbar.defaultProps & {
    actionStyle: StyleProp<TextStyle>;
    attachTo: 'bottom' | 'top';
    messageStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    zIndex: number;
};
declare type SnackbarState = {
    messages: SnackbarMessageState[];
};
/**
 * Snackbar
 *
 * Manages the popups/notifications
 *
 * @name Snackbar
 * @access public
 * @extends React.Component
 */
export declare class Snackbar extends React.Component<SnackbarProps, SnackbarState> {
    static defaultProps: {
        actionStyle: {
            color: string;
            padding: number;
        };
        attachTo: string;
        messageStyle: {
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
            padding: number;
            shadowColor: string;
            shadowOffset: {
                width: number;
                height: number;
            };
            shadowOpacity: number;
        };
        textStyle: {
            color: string;
        };
        zIndex: number;
    };
    state: {
        messages: never[];
    };
    constructor(props: SnackbarProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    action(id: string, callback: SnackbarMessageActionOnPress): void;
    addMessage(options: string | SnackbarMessage): void;
    remove(id: string): void;
    render(): JSX.Element | null;
}
export {};
