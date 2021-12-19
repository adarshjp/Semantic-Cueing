let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

function showDoctors() {       //myFunc
  var doctors = document.getElementById("doctors");  //abc
  var patients = document.getElementById("patients"); //def
  var graphs = document.getElementById("graphs"); //ijh
  var profile = document.getElementById("profile"); //klm
  

  if (doctors.style.display === "none") {
    graphs.style.display = "none";
    doctors.style.display = "block";
    patients.style.display = "none";
    profile.style.display = "none";
  } else {
    doctors.style.display = "none";
  }
}
 
function showPatients() {         //myFunc1
  var patients = document.getElementById("patients");
  var doctors = document.getElementById("doctors");
  var graphs = document.getElementById("graphs");
  var profile = document.getElementById("profile");
  if (patients.style.display === "none") {
    graphs.style.display = "none";
    patients.style.display = "block";
    doctors.style.display = "none";
   
    profile.style.display = "none";
  } else {
    patients.style.display = "none";
  }
}

function showHome() {        //myFunc2
  var patients = document.getElementById("patients");
  var doctors = document.getElementById("doctors");
  var graphs = document.getElementById("graphs");
  var profile = document.getElementById("profile");
  if (graphs.style.display === "none") {
    graphs.style.display = "block";
    patients.style.display = "none";
    doctors.style.display = "none";
    
    profile.style.display = "none";
   
  } else {
    graphs.style.display = "none";
  }
}

function showProfile() {           //myFunction3
  var patients = document.getElementById("patients");
  var doctors = document.getElementById("doctors");
  var graphs = document.getElementById("graphs");
  var profile = document.getElementById("profile");

  if (profile.style.display === "none") {
    profile.style.display = "block";
    graphs.style.display = "none";
    doctors.style.display = "none";
    patients.style.display = "none";
  } else {
    profile.style.display = "none";
  }
}

function showTestAssigned() {      //myfunc4
  var dassigned = document.getElementById("dassigned");
  var tassigned = document.getElementById("tassigned");
  var patientprofile = document.getElementById("patientprofile");
  

  if (tassigned.style.display === "none") {
    tassigned.style.display = "block";
    dassigned.style.display = "none";
    patientprofile.style.display = "none";
 
  } else {
    tassigned.style.display = "none";
  }
}

function docAssigned() {      
  var dassigned = document.getElementById("dassigned");  
  var tassigned = document.getElementById("tassigned"); 
 
  var patientprofile = document.getElementById("patientprofile"); 
  

  if (dassigned.style.display === "none") {
 
    dassigned.style.display = "block";
    patientprofile.style.display = "none";
    tassigned.style.display = "none";
    
  } else {
    dassigned.style.display = "none";
  }
}
 

function showPatientProfile() {            
  var dassigned = document.getElementById("dassigned");   
  var tassigned = document.getElementById("tassigned");  
 
  var patientprofile = document.getElementById("patientprofile");  

  if (patientprofile.style.display === "none") {
    patientprofile.style.display = "block";
    
    dassigned.style.display = "none";
    tassigned.style.display = "none";
  } else {
    patientprofile.style.display = "none";
  }
}

function showDashboard() {        //myFunc2
  var passigned = document.getElementById("passigned");
  var dgraph = document.getElementById("dgraph");
  var dprofile = document.getElementById("dprofile");
  if (dgraph.style.display === "none") {
    dgraph.style.display = "block";
    passigned.style.display = "none";
    dprofile.style.display = "none";
   
  } else {
    dgraph.style.display = "none";
  }
}

function showPatientsAssigned() {         //myFunc1
  var passigned = document.getElementById("passigned");
  var dgraph = document.getElementById("dgraph");
  var dprofile = document.getElementById("dprofile");
  if (passigned.style.display === "none") {
    dgraph.style.display = "none";
    passigned.style.display = "block";
    dprofile.style.display = "none";
  } else {
    passigned.style.display = "none";
  }
}

function showDocProfile() {
  var passigned = document.getElementById("passigned");
  var dgraph = document.getElementById("dgraph");
  var dprofile = document.getElementById("dprofile");

  if (dprofile.style.display === "none") {
    dprofile.style.display = "block";
    dgraph.style.display = "none";
   
    passigned.style.display = "none";
  } else {
    dprofile.style.display = "none";
  }
}

