import React from 'react';
import * as Flex from '@twilio/flex-ui';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class AgentDispositionModal extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.showForm = this.showForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleDispositionChange = this.handleDispositionChange.bind(this);
    this.state = {
      open: false,
      disposition: 'option-1'
    };
  }

  componentDidMount() {
    window.addEventListener('agentDispositionModalOpen', (e) => {
      this.showForm();
    }, false)
  }

  showForm() {
    this.setState({ open: true });
  }

  cancelForm() {
    this.setState({ open: false });
    var event = new Event('agentDispositionCanceled');
    window.dispatchEvent(event);
  }

  submitForm() {
    this.setState({ open: false });
    var event = new CustomEvent('agentDispositionSuccessful', { detail: { disposition: this.state.disposition }});
    window.dispatchEvent(event);
  }

  handleDispositionChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.cancelForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">What was this conversation about?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If the conversation was about multiple topics, which single topic best describes it?
            </DialogContentText>
            <Select
              value={this.state.disposition}
              onChange={this.handleDispositionChange}
              name="disposition"
              style={{
                'marginTop': '20px'
              }}
            >
              <MenuItem value="option-1">Option 1</MenuItem>
              <MenuItem value="option-2">Option 2</MenuItem>
              <MenuItem value="option-3">Option 3</MenuItem>
              <MenuItem value="option-4">Option 4</MenuItem>
              <MenuItem value="option-5">Option 5</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions style={{
            margin: '0',
            padding: '8px 4px'
          }}>
            <Flex.Button onClick={this.cancelForm}>
              Cancel
            </Flex.Button>
            <Flex.Button onClick={this.submitForm}>
              Submit
            </Flex.Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}