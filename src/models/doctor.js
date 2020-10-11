class Doctor {
  constructor(data) {
    data = data || {};
    this.firstName = data.firstName ? data.firstName : "";
    this.lastName = data.lastName ? data.lastName : "";
    this.occupation = data.occupation ? data.occupation : "";
    this.calendarColor = data.calendarColor ? data.calendarColor : "";
  }
}

export { Doctor }
