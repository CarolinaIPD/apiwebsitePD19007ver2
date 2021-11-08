/*Alumno: Carolina Isabel Pineda Delgado
  Carnet: PD19007
  Grupo de trabajo: 05*/
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='option'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");

	  var ids,titles,prices,descriptions,categories,fotos,op;

	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<=num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  op=document.getElementsByClassName("option");

	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");orden=-1;precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		op[nfila].innerHTML="<button>Eliminar</button>";
		op[nfila].firstChild.setAttribute("onclick","eliminar('"+productos[nfila].id+"','"+productos[nfila].title+"');");
		
		}
	}

function obtenerProductos() {
	  fetch('https://retoolapi.dev/gwHMvg/productos')
            .then(res=>res.json())
            .then(data=>{productos=data;
				productos.forEach(function(producto){
					producto.price=parseFloat(producto.price)
				});
				listarProductos(data)})
}
function ti(){
	var palabra=document.getElementById("titulo").value;
	return palabra;
}
function pre(){
	var palabra=document.getElementById("precio").value;
	return palabra;
}
function des(){
	var palabra=document.getElementById("descripcion").value;
	return palabra;
}
function im(){
	var palabra=document.getElementById("imagen").value;
	return palabra;
}
function ca(){
	var palabra=document.getElementById("categoria").value;
	return palabra;
}

function guardarProducto(titulo,precio,descripcion,imagen,categoria) {
	
	var miprod={
		image:imagen,
		price:precio,
		title:titulo, 
		category:categoria,
		description:descripcion}
		
		fetch("https://retoolapi.dev/gwHMvg/productos",
		{ method:"POST",
		  body: JSON.stringify(miprod),
		  headers: {
			 'Accept': 'application/json',
			 'Content-type': 'application/json; charset=UTF-8',
		  }
		})
		.then(res=>res.json())
		.then(data=>productos=data);
		orden=0;
		window.setTimeout(obtenerProductos, 1000);
		
}
function eliminar(id,nom){
	
	fetch("https://retoolapi.dev/gwHMvg/productos/"+id,
	{ method:"DELETE"})
	.then(res=>res.json())
	.then(data=>productos=data);
	alert("Se ha eliminado el producto "+nom);
	orden=0;
	window.setTimeout(obtenerProductos, 1000);
	
}
function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}
