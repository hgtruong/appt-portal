import { Doctor } from "./doctor.js";

class Appointment {
  constructor(data) {
    data = data || {};
    this.id = data.id ? data.id : null;
    this.firstName = data.firstName ? data.firstName : "";
    this.lastName = data.lastName ? data.lastName : "";
    this.reasonForVisit = data.reasonForVisit ? data.reasonForVisit : "";;
    this.start = new Date();
    this.end = new Date();
    this.allDay = false;
    this.title = data.title ? data.title : "";
    this.doctor = new Doctor(data.doctor);
  }
}

export { Appointment }