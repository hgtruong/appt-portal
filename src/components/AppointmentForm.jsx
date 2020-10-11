import React from "react";
import {
  Form,
  Input,
  Select,
  TextArea,
  Button,
  Message,
  Modal
} from 'semantic-ui-react';
import doctors from "../DummyData/doctors";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Doctor } from "../models/doctor";

const options = [];
options.push(
  {
    key: `0`,
    text: ``,
    value: ``
  }
)

for(let i =0; i < doctors.length; i++) {
  options.push({
    key: `${i+2}`,
    text: `Dr. ${doctors[i].firstName} ${doctors[i].lastName} (${doctors[i].occupation})`,
    value: `${doctors[i].firstName} ${doctors[i].lastName} ${doctors[i].occupation}`
  });
}

const divStyle = {
  margin: '15px'
}

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.appointment.id ? this.props.appointment.id : null,
      firstName: this.props.appointment.firstName ? this.props.appointment.firstName : "",
      lastName: this.props.appointment.lastName ? this.props.appointment.lastName : "",
      reasonForVisit: this.props.appointment.reasonForVisit ? this.props.appointment.reasonForVisit : "",
      start: this.props.appointment.start,
      end: this.props.appointment.end,
      title: this.props.appointment.title,
      doctor: this.props.appointment.doctor,
      selectedDay: this.props.appointment.start,
      cancel: false,
      validDateSelected: this.props.appointment.start ? true : false,
      cancelConfirmOpen: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkInputFieldsFilled = this.checkInputFieldsFilled.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.isEditing = this.isEditing.bind(this);
    this.showCancelConfirmModal = this.showCancelConfirmModal.bind(this);
    this.closeCancelConfirmModal = this.closeCancelConfirmModal.bind(this);
    this.openCancelConfirmModal = this.openCancelConfirmModal.bind(this);
  }

  handleDayClick(day, modifiers = {}) {
    if(modifiers.disabled) {
      this.setState({validDateSelected: false});
      return;
    }

    this.setState({validDateSelected: true});

    this.setState({
      selectedDay: modifiers.selected ? undefined : day
    }, () => {
      this.setState({start: this.state.selectedDay, end: this.state.selectedDay});
    });
  }

  handleChange(event, {name, value}) {
    if(name === "doctor") {
      if(value !== "") {
        let doctorName = value.split(" ");
        let foundDoctor = doctors.filter((currentDoctor) => {
          return (currentDoctor.firstName === doctorName[0] &&
                  currentDoctor.lastName === doctorName[1]
                 )
        });
        this.setState({doctor: foundDoctor[0]});
      } else {
        this.setState({doctor: new Doctor()});
      }
    } else {
      this.setState({[name]: value});
    }

  }

  handleSubmit(event) {
    if(!this.state.cancel) {
      this.setState({title: `Dr. ${this.state.doctor.lastName} (${this.state.doctor.occupation})`}, () => {
        if(!this.props.isExistingAppointment(this.state.id)) {
          this.props.addNewAppointment(this.state);
        } else {
          this.props.updateAppointment(this.state);
        }
      });
    }
  }

handleDelete(event) {
  this.props.deleteAppointment(this.state.id);
}

openCancelConfirmModal() {
  this.showCancelConfirmModal("mini");
}

showCancelConfirmModal(size) {
  this.setState({ size, cancelConfirmOpen: true});
}

closeCancelConfirmModal() {
  this.setState({ cancelConfirmOpen: false });
}

isEditing() {
  return this.state.id !== null ? true : false;
}

checkInputFieldsFilled() {
  return this.state.firstName        !== "" &&
         this.state.lastName         !== "" &&
         this.state.doctor.firstName !== "" &&
         this.state.validDateSelected
}

handleCancel() {
  this.props.closeModal();
}

  render() {
    const {size, cancelConfirmOpen} = this.state;

    return (  
      <div>
        <div style={divStyle}>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                label="First name"
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
                placeholder="First name"
              />
              <Form.Field
                control={Input}
                label="Last name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group >
              <Form.Field
                width={8} 
                control={Select}
                label="Doctor"
                name="doctor"
                value={`${this.state.doctor.firstName} ${this.state.doctor.lastName} ${this.state.doctor.occupation}`}
                options={options}
                onChange={this.handleChange}
                placeholder="Doctor"
              />

                <DayPicker
                  modifiers={ {
                    disabled: {daysOfWeek: [0,6]}
                  } }
                  onDayClick={this.handleDayClick}
                  selectedDays={this.state.selectedDay}
                  month={this.state.start}
                />
            </Form.Group>
            <Form.Group widths='2'>
              <Form.Field
                  control={TextArea}
                  label="Reason for visit:"
                  name="reasonForVisit"
                  value={this.state.reasonForVisit}
                  onChange={this.handleChange}
                  placeholder="Tell us what's bringing you in..."
                />
            </Form.Group>
            <Form.Group>
              <Form.Field width='8'>
                <Message 
                  size="small" 
                  negative 
                  hidden={this.checkInputFieldsFilled()}
                  > All fields must be filled in and/or chosen to proceed 
                </Message>
              </Form.Field>
            </Form.Group>

            <Form.Group>
              <Form.Field width="13">
                  <Button 
                    type="button" 
                    positive
                    floated="left"
                    disabled={!this.checkInputFieldsFilled()} 
                    onClick={this.handleSubmit}
                  >Schedule Appointment</Button>

                  <Button 
                    type="button" 
                    floated="left"
                    negative onClick={this.handleCancel}
                  > Cancel </Button>
              </Form.Field>
              <Form.Field>
                  <Button 
                    animated="fade"
                    type="button"
                    negative
                    floated="right"
                    disabled={!this.isEditing()}
                    onClick={this.openCancelConfirmModal} 
                  >
                    <Button.Content visible>  Cancel Appointment </Button.Content>
                    <Button.Content hidden> Click to confirm cancel </Button.Content>
                  </Button>
              </Form.Field>
            </Form.Group>
          </Form>
        </div>
        
        <div className="delete-confirm-modal">
          <Modal size={size} open={cancelConfirmOpen} onClose={this.closeCancelConfirmModal} closeOnDimmerClick={false}>
            <Modal.Header align="center">Canceling Appointment</Modal.Header>
            <Modal.Content align="center">
              <p>Are you sure you want to cancel this appointment?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                type="button"
                positive
                onClick={this.handleDelete}
              > Yes </Button>

              <Button
                type="button"
                negative 
                onClick={this.closeCancelConfirmModal}
              > No </Button>

            </Modal.Actions>
          </Modal>
        </div>
      </div>
    )
  }
}

export { AppointmentForm}