function countQuestion(){
    document.getElementById('count').textContent = document.querySelectorAll('input[type="checkbox"]:checked').length;
}

function cart(){
    document.getElementById("selected-q-tab").classList.add("active");
    document.getElementById("sel-q-tab").classList.remove("active");
    document.getElementById("selected-q-tab").click();
}

document.getElementById('sel-q-tab').addEventListener('click', function(){
    for(var i=1;i<li_id;i++){
        document.getElementById('question'+i).style.display="block";
    }
    isCompleted=temp;
    document.getElementById('sel-row').classList.remove('d-none');
    document.getElementById('sel-pat').classList.add('d-none');
    document.getElementById('sel-lev').classList.add('d-none');
    document.getElementById('res_but').classList.add('d-none');
    document.getElementById('title').classList.add('d-none');
    document.getElementById('no_question').classList.add('d-none');
    document.getElementById('question-row').classList.remove('d-none');
    
});

document.getElementById('selected-q-tab').addEventListener('click', function(){
    showSelectedQuestion();
    temp=isCompleted;
    isCompleted=true;
    document.getElementById('sel-row').classList.add('d-none');
    document.getElementById('sel-pat').classList.remove('d-none');
    document.getElementById('sel-lev').classList.remove('d-none');
    document.getElementById('res_but').classList.remove('d-none');
    document.getElementById('title').classList.remove('d-none');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length===0){
        document.getElementById('no_question').classList.remove('d-none');
        document.getElementById('question-row').classList.add('d-none');
        document.getElementById('sel-pat').classList.add('d-none');
        document.getElementById('sel-lev').classList.add('d-none');
        document.getElementById('res_but').classList.add('d-none');
        document.getElementById('title').classList.add('d-none');
    }
});

function reSet(){
    for(var i=1;i<=li_id-1;i++){
        document.getElementById("option"+i).checked = false;
    }
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length===0){
        document.getElementById('no_question').classList.remove('d-none');
        document.getElementById('question-row').classList.add('d-none');
    }
    showSelectedQuestion();
    countQuestion();
}

function selRandom(){
    var num=li_id-1;
    var ran;
    var cur_level=document.getElementById("level").value;
    for(var i=1;i<=num;i++){
        document.getElementById("option"+i).checked = false;
    }
    if(cur_level=="all"){
        for(var i=0;i<Math.min(num,5);){
            ran=Math.floor(Math.random() * num) + 1;
            if(!(document.getElementById("option"+ran).checked)){
                document.getElementById("option"+ran).checked = true;
                i++;
            }
        }
    }
    else{
        var m=Math.min(num,Math.min(document.getElementsByClassName(cur_level).length,10))
        for(var i=0;i<m;){
            ran=Math.floor(Math.random() * m);
            if(!(document.getElementsByClassName("op"+cur_level)[ran].checked)){
                document.getElementsByClassName("op"+cur_level)[ran].checked=true;
                i++;
            }
        }
    }
    document.getElementById("level").value='all';
    countQuestion();
}
function showhidelevel(levclass,disp){
    for(var i=0;i<levclass.length;i++){
        levclass[i].style.display=disp;
    }
}
function levelfilter(){
    var level=document.getElementById("level").value;
    var levclass;
    if(level!="all"){
        for(var i=1;i<=5;i++){
            if(level==i){
                levclass=document.getElementsByClassName(level)
                showhidelevel(levclass,"block")
            }
            else{
                levclass=document.getElementsByClassName(i)
                showhidelevel(levclass,"none")
            }
        }
    }
    else{
        for(var i=1;i<=5;i++){
            var levclass=document.getElementsByClassName(i)
            showhidelevel(levclass,"block")
        }
    }
}
function showSelectedQuestion(){
    var num=li_id-1;
    for(var i=1;i<=num;i++){
        if(document.getElementsByClassName('question'+i)[0].checked){
            document.getElementById('question'+i).style.display="block";
        }
        else{
            document.getElementById('question'+i).style.display="none";
        }
    }
    document.getElementById("level").value='all';
}

function append_div(q,ischecked){
    let div=document.createElement("div");
    
    div.className='ms-3 ms-md-0 col-11 border border-2 rounded-3 shadow-sm my-2 py-3 '+q.level;
    div.id='question'+li_id;

    let card_img=document.createElement('div');
    card_img.className='card-image mx-0 p-2';

    let inputGroup=document.createElement('div');
    inputGroup.className='inputGroup';

    let input=document.createElement('input');
    input.id="option"+li_id;
    input.className='form-check-input question'+li_id+' op'+q.level;
    input.type="checkbox";
    input.value=q._id;
    input.name='questions';
    if(ischecked!=''){
        input.setAttribute('checked','')
    }
    input.setAttribute('onclick','countQuestion()');

    let label=document.createElement('label');
    label.setAttribute('for','option'+li_id);

    let div_label_row=document.createElement('div');
    div_label_row.className='row';

    let div_label_col_1=document.createElement('div');
    div_label_col_1.className='col-10 col-sm-11 col-md-5 text-truncate';

    let strong=document.createElement('strong');
    strong.textContent=q.name;

    div_label_col_1.appendChild(strong);

    let div_label_col_2 = document.createElement('div');
    div_label_col_2.className='col-10 col-sm-11 col-md-5 mt-2 mt-md-0';
    
    let p=document.createElement('p');
    p.className='h6';
    p.textContent='';

    for(let x=1;x<=5;x++){
        let span=document.createElement('span');
        span.className='fa fa-star'
        if(x<=q.level){
            span.classList.add('checked')
        }else{
            span.classList.add('unchecked')
        }
        p.appendChild(span);
        p.innerHTML +=' '
    }
    div_label_col_2.appendChild(p);
    div_label_row.appendChild(div_label_col_1);
    div_label_row.appendChild(div_label_col_2);
    label.appendChild(div_label_row);

    let hover_img=document.createElement('div');
    hover_img.className='hover-img';

    let span=document.createElement('span');
    span.className='p-1 rounded-lg my-3';
    span.id='qimg';

    let img=document.createElement('img');
    img.className='img-fluid';
    img.alt='image';
    img.style.cssText='max-height: 18rem;'
    img.src='data:image/'+q.question.contentType+';base64,'+arrayBufferToBase64(q.question.data.data);
    
    span.appendChild(img);
    hover_img.appendChild(span);
    inputGroup.appendChild(input);
    inputGroup.appendChild(label);

    card_img.appendChild(inputGroup);
    card_img.appendChild(hover_img);

    div.appendChild(card_img);

    document.getElementById('div_list').append(div);
    li_id++;
}

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

function chnage_patinet_list(){
    var selected = $("#patient-list :selected").map((_, e) => e.value).get();
    document.getElementById('patientIDs').value=JSON.stringify(selected);
}
$(document).ready(function(){
    var multipleCancelButton = new Choices('#patient-list', {
        removeItemButton: true,
        maxItemCount:100,
        searchResultLimit:10,
        renderChoiceLimit:5
    });
});