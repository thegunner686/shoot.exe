class Driver {
  constructor(air_console) {
    this.air_console = air_console;

    this.air_console.onDeviceMotion = (data) => {
      console.log(data);
    };
  }



  updateUI() {

  }

  renderUI(ctx) {

  }
}
