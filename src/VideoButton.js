import React from 'react';
import {SideLink,Actions} from '@twilio/flex-ui';


const VideoButton = ({activeView}) => {
    function navigate() {
        Actions.invokeAction('NavigateToView', {
            viewName: 'video-view'
        });
    }

    return ( 
        <SideLink showLabel = {true}
        icon = "Eye"
        iconActive = "EyeBold"
        isActive = {activeView === 'video-view'}
        onClick = {navigate} >
        Video Link Call 
        </SideLink>
    );
};

export default VideoButton;