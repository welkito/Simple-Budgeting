window.onload = function(){ //make sure kalau halaman html uda ke-load, baru jalanin function
    var storeddata = JSON.parse(localStorage.names);
    console.log(storeddata); //nilai storeddata keliatan di inspect-console

    var table = document.getElementById("spendtable");
    console.log();
    for(let i = 0; i < storeddata.length; i++)
    {
        var row = table.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = storeddata[i]["barang"];
        cell2.innerHTML = storeddata[i]["uang"];
        cell3.innerHTML = storeddata[i]["orang"];
    }
}