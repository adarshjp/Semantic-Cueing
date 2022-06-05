/*--------------------------- Sidebar---------------------------*/
function sidebar_toggle() {
  let sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("close");
}
/*--------------------------- Slider----------------------------*/

/*********************************************
Function to check level of test and questions
**********************************************/
function checklevel(value) {
  if(value<=0 || value>5){
      alert("Please enter Level between 1-5");
      document.getElementById("login-input1").value = "";
  }
}
/***************************************** */

/*-------Tooltip--------*/
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
/*-------END------------*/