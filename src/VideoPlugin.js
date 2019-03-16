import {FlexPlugin} from 'flex-plugin';
import {View} from '@twilio/flex-ui';
import VideoView from './VideoView';
import React from 'react';
import VideoButton from './VideoButton';


const PLUGIN_NAME = 'VideoPlugin';

export default class VideoPlugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }
    init(flex, manager) {
        flex.SideNav.Content.add( 
            <VideoButton key = 'video-view-button' />
        );

        flex.ViewCollection.Content.add( 
            <View name = "video-view" key = "video-view">
                <VideoView / >
            </View>
        )

    }
}
