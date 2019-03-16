import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import {render} from "react-dom";
import "./styles.css";
import VideoComponent from './VideoComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import injectTapEventPlugin from "react-tap-event-plugin";
//injectTapEventPlugin();
//const dom = document.getElementById("container");
//const dom = wholeDom[0];

export default class CustomView extends React.Component {
    render() {
        return ( 
            <MuiThemeProvider muiTheme = {getMuiTheme(lightBaseTheme)} >
            <div>
            <AppBar title = "Video Collaboration Service" / >
            <VideoComponent / >
            </div>  
            </MuiThemeProvider>
        )
    }
}