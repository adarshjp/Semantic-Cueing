document.getElementById('all').addEventListener('click',function(){
    console.log(total_test)
    disp_test_or_no_test('all',total_test)
    for(var i=0;i<total_test;i++){
        document.getElementsByClassName('test'+i)[0].classList.remove('d-none');
    }
});

document.getElementById('paused').addEventListener('click',function(){
    let paused=document.getElementsByClassName('paused');
    disp_test_or_no_test('paused',paused.length)
    for(var i=0;i<total_test;i++){
        document.getElementsByClassName('test'+i)[0].classList.add('d-none');
    }
    for(let i=0;i<paused.length;i++){
      paused[i].classList.remove('d-none');
    }
});
  
document.getElementById('pending').addEventListener('click',function(){
    let pending=document.getElementsByClassName('pending');
    disp_test_or_no_test('pending',pending.length)
    for(var i=0;i<total_test;i++){
        document.getElementsByClassName('test'+i)[0].classList.add('d-none');
    }
    for(let i=0;i<pending.length;i++){
      pending[i].classList.remove('d-none');
    }
});

document.getElementById('completed').addEventListener('click',function(){
    let completed=document.getElementsByClassName('completed');
    disp_test_or_no_test('completed',completed.length)
    for(var i=0;i<total_test;i++){
        document.getElementsByClassName('test'+i)[0].classList.add('d-none');
    }
    for(let i=0;i<completed.length;i++){
      completed[i].classList.remove('d-none');
    }
});

function count_number_of_tests(status,count) {
    document.getElementById(status).innerHTML='<strong style="text-transform: capitalize;">'+status+'</strong><span class="badge bg-danger ms-2">'+count+'</span>';
}

function disp_test_or_no_test(status,count){
    if(count===0){
      document.getElementById('test_status').classList.add('d-none');
      document.getElementById('no_test').classList.remove('d-none');
      if(status==='all'){
        document.getElementById('msg').innerHTML="<span class='blue'>No test</span> is assigned.";
      }else{
        document.getElementById('msg').innerHTML="<span class='blue'>No test</span> is "+status+"..!";
      }
    }else{
      document.getElementById('test_status').classList.remove('d-none');
      document.getElementById('no_test').classList.add('d-none');
    }
}