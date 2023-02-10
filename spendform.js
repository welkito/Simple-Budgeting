//deklarasi array yg dibutuhin untuk kedua form;
let data = [];
let ov = [];
let jenis = [];

//AMBIL NILAI STATUS UTK TAU BARU HALAMAN AWAL/SUDAH MULAI
var attempt = JSON.parse(localStorage.status);

//untuk input pertama muncul hanya sekali(TRUE), input kedua seterusnya(FALSE)

if (attempt.state){
    //tidak muncul dlu kalau baru 1st attempt
    document.getElementById("formspend").style.display = "none";
    document.getElementById("end").style.display = "none";
    //1st attempt, jenis data spend msih kosong
    jenis = [];
}
else
{
    //form 1 tidak muncul pas input data lagi
    document.getElementById("formov").style.display = "none";
    document.getElementById("formovbutton").style.display = "none";

    //jenis sudah ada
    jenis = JSON.parse(localStorage.jenis);
    ov = JSON.parse(localStorage.ovnames);
    console.log(jenis);
    console.log(ov);
    listItem(jenis);
}
attempt.state = false;
localStorage.status = JSON.stringify(attempt);


////////////////////////////////////////////////////////////////////
///bagian form input 1
var overviewForm = document.getElementById("formov");
if(overviewForm){
    overviewForm.addEventListener("submit", updateoverview);
}

function updateoverview(e){
    e.preventDefault();
    let jenisBarang = document.getElementById("thingtype").value;
    let batasUang = document.getElementById("moneycap").value;
    let b = {
        jenis : jenisBarang,
        nominal :batasUang,
        batas : batasUang
    }
    ov.push(b);
    jenis.push(jenisBarang);
    localStorage.jenis = JSON.stringify(jenis);
    overviewForm.reset();
    console.log(ov);
    console.log(jenis);
}

function overview(){
    document.getElementById("formov").style.display = "none";
    document.getElementById("formovbutton").style.display = "none";
    document.getElementById("formspend").style.display = "";
    document.getElementById("end").style.display = "";
    listItem(jenis);
}
////////////////////////////////////////////////////////////////
//bagian form input 2

////////////////////////////////////////////////////////////////////////////////////////////
var spendingForm = document.getElementById("formspend");
if(spendingForm){
    spendingForm.addEventListener("submit", updatespend);
}


function updatespend(e){
    e.preventDefault();
    let barang = document.getElementById("thing").value;
    let uang = document.getElementById("money").value;

    //TODO: UBAH SELECTION JADI VALUE
    var tempPerson = document.getElementById("mySelect");
    console.log(tempPerson);
    var value = tempPerson.options[tempPerson.selectedIndex].value;
    var index = tempPerson.options[tempPerson.selectedIndex].index;
    console.log(index);
    ov[index].batas = ov[index].batas - uang;
    console.log(ov[index].batas);
    let a = {
        barang : barang,
        uang : uang,
        orang : value
    }
    data.push(a);
    console.log(data);
    spendingForm.reset();
}

/////////////////////////////////////////////////////////////////
//biar bisa dipake kemana mana datanya
function saveToLocalStorage() {
    let storage = [];
    if(localStorage.names)
    {
        storage =[...JSON.parse(localStorage.names),...data]; //... artinya menggabungkan 2 array jadi 1
        localStorage.names = JSON.stringify(storage);
    }
    else
    {
        localStorage.names = JSON.stringify(data);
    }

    localStorage.ovnames = JSON.stringify(ov);

    if(!localStorage.jenis){
        localStorage.jenis = JSON.stringify(jenis);
    }
}


function listItem(listArray){
    var myDiv = document.getElementById("person");
    
//Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    myDiv.appendChild(selectList);

//Create and append the options
    for (var i = 0; i < listArray.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", listArray[i]);
        option.text = listArray[i];
        selectList.appendChild(option);
    }
}