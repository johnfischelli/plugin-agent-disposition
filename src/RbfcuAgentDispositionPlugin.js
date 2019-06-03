import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import AgentDispositionModal from './AgentDispositionModal';

const PLUGIN_NAME = 'RbfcuAgentDispositionPlugin';

export default class RbfcuAgentDispositionPlugin extends FlexPlugin {
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

    flex.RootContainer.Content.add(<AgentDispositionModal manager={ manager } key="AgentDispositionModal"></AgentDispositionModal>, {
      sortOrder: 1
    })

    flex.Actions.addListener('beforeCompleteTask', (payload, abort) => {
      // publish a window event to open the modal component
      var event = new Event('agentDispositionModalOpen');
      window.dispatchEvent(event);

      // returns a promise to modify the beforeCompleteTask Behavior
      return new Promise((resolve, reject) => {

        // if the agent successfully selects a disposition
        window.addEventListener('agentDispositionSuccessful', (e) => {
          // get existing attributes
          let attributes = payload.task.attributes;
          // merge new attributes
          attributes = Object.assign(attributes, {
            conversations: {
              outcome: e.detail.disposition
            }
          });
          // set new attributes on the task
          payload.task.setAttributes(attributes);
          // complete the task
          resolve(`Agent completed task with code: ${e.detail.disposition}`);
        }, false)

        // if the agent decides to cancel the modal window
        window.addEventListener('agentDispositionCanceled', (e) => {
          abort()
          reject('Agent Canceled Disposition');
        }, false)

      })
    })
  }
}
