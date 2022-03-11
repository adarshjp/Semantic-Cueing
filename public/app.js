/*--------------------------- Sidebar---------------------------*/
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
/*--------------------------- Slider----------------------------*/
var patients = document.getElementById('patients')
var doctors = document.getElementById('doctors')
var graphs = document.getElementById('graphs')
var profile = document.getElementById('profile')
var question=document.getElementById('addQuestion')
function showDoctors() {
  //myFunc
  graphs.style.display = 'none'
  doctors.style.display = 'block'
  patients.style.display = 'none'
  profile.style.display = 'none'
  question.style.display = 'none'
}

function showPatients() {
  //myFunc1
  graphs.style.display = 'none'
  patients.style.display = 'block'
  doctors.style.display = 'none'
  profile.style.display = 'none'
  question.style.display = 'none'

}

function showHome() {
  //myFunc2
  graphs.style.display = 'block'
  patients.style.display = 'none'
  doctors.style.display = 'none'
  profile.style.display = 'none'
  question.style.display = 'none'

}
function showAddQuestion() {
  //set display of question to block when clicked
  question.style.display = 'block'
  //rest all to none
  graphs.style.display = 'none'
  patients.style.display = 'none'
  doctors.style.display = 'none'

  profile.style.display = 'none'
}
function showProfile() {

  profile.style.display = 'block'
  graphs.style.display = 'none'
  doctors.style.display = 'none'
  patients.style.display = 'none'
  question.style.display = 'none'

}
//Admin Home Page Functions Ends here
var dassigned = document.getElementById('dassigned')
var tassigned = document.getElementById('tassigned')
var patientprofile = document.getElementById('patientprofile')
function showTestAssigned() {
  //myfunc4
  
  tassigned.style.display = 'block'
  dassigned.style.display = 'none'
  patientprofile.style.display = 'none'
}

function docAssigned() {

  dassigned.style.display = 'block'
  patientprofile.style.display = 'none'
  tassigned.style.display = 'none'
}

function showPatientProfile() {
 

  patientprofile.style.display = 'block'

  dassigned.style.display = 'none'
  tassigned.style.display = 'none'
}
//Patinet home Page end here
var passigned = document.getElementById('passigned')
  var dgraph = document.getElementById('dgraph')
  var dprofile = document.getElementById('dprofile')
function showDashboard() {
  //myFunc2
  
  dgraph.style.display = 'block'
  passigned.style.display = 'none'
  dprofile.style.display = 'none'
}

function showPatientsAssigned() {
  //myFunc1
  
  dgraph.style.display = 'none'
  passigned.style.display = 'block'
  dprofile.style.display = 'none'
}

function showDocProfile() {


  dprofile.style.display = 'block'
  dgraph.style.display = 'none'

  passigned.style.display = 'none'
}
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
