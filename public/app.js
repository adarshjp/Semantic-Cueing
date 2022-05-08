let swal_footer=document.getElementsByClassName('swal-footer');

for(let i=0; i<swal_footer.length; i++) {
  document.getElementsByClassName('swal-footer')[i].classList.add('text-center');
  document.getElementsByClassName('swal-button')[i].classList.add('btn','btn-lg','btn-info');
}

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
