/*--------------------------- Sidebar---------------------------*/
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
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
