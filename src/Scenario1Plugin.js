import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import CustomTaskListComponent from './CustomTaskListComponent';
import JobList from './JobListComponent';

const PLUGIN_NAME = 'Scenario1Plugin';

export default class Scenario1Plugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    /*
    flex.AgentDesktopView.Panel1.Content.add(
      <CustomTaskListComponent key="demo-component" />,
      {
        sortOrder: -1,
      }
    );
    */
   flex.AgentDesktopView.Panel2.Content.replace(
     <JobList key="job-list" />,
     {
       sortOrder: -1,
     }
   );
   /*
    flex.AgentDesktopView.defaultProps.showPanel2 = false;

    flex.Actions.addListener("beforeAcceptTask", (payload) => flex.AgentDesktopView.defaultProps.showPanel2 = true);
    flex.Actions.addListener("afterCompleteTask", (payload) => flex.AgentDesktopView.defaultProps.showPanel2 = false);
    */

    flex.MainHeader.defaultProps.logoUrl = "LOGO-URL-HERE";
  }
}
