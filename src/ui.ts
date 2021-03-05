import "figma-plugin-ds/dist/figma-plugin-ds.css";

//CAMEL CASE
function trimForwardSlash(text){
  var index = text.lastIndexOf("/");
  if(index == -1) return text;
  return text.substr(index+1);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelCase(text){
  //["a","b","c"].reduce((a,x)=>a+x, "-")
  const lwrText = text.toLowerCase();
  const array = lwrText.split(" ");
  return array.reduce((accum, val)=> accum + capitalizeFirstLetter(val.toLowerCase()));
}
//----

document.getElementById("copy").onclick = () => {
  //parent.postMessage({ pluginMessage: { type: "copy" } }, "*");
  parent.postMessage({ pluginMessage: { type: "getTheme" } }, "*");
};

document.getElementById("generate").onclick = () => {
  // Clear errors
  const errorBox = document.getElementById("msg");
  errorBox.classList.remove("flex");
  errorBox.classList.add("hidden");

  const textbox = <HTMLTextAreaElement>document.getElementById("theme");

  // Check if theme is empty before sending
  if (textbox?.value !== "") {
    parent.postMessage(
      { pluginMessage: { type: "generate", theme: textbox.value } },
      "*"
    );
  } else {
    const errorBox = document.getElementById("msg");
    errorBox.classList.remove("hidden");
    errorBox.classList.add("flex");
    const errorText = document.getElementById("msg-text");
    errorText.innerHTML =
      "No theme found. Please copy your theme inside the text box.";
  }
};


function spread(rootObject, spreadWith){
  for(var key in spreadWith){
    rootObject[key] = spreadWith[key];
  }
}

onmessage = (event) => {


  const response = event.data.pluginMessage;

  if(response.type == "jsonTheme"){

    const textbox = <HTMLTextAreaElement>document.getElementById("theme");
    textbox.value = response.message;

    var themeObj = response.message;
    textbox.value = JSON.stringify(themeObj, null, 4);


    const textareaResult = <HTMLTextAreaElement>document.getElementById("textareaResult");
    //textareaResult.value = response.message;
    textareaResult.value = JSON.stringify(themeObj, null, 4);

    textbox.select();
    textbox.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");


    //componentInfo
  }else if(response.type == "selection"){
    const componentInfo = <HTMLTextAreaElement>document.getElementById("componentInfo");
    const textPreview = <HTMLTextAreaElement>document.getElementById("textPreview");
    const typographyName = <HTMLTextAreaElement>document.getElementById("typographyName");
    const colourName = <HTMLTextAreaElement>document.getElementById("colourName");
    const colorBlock = <HTMLTextAreaElement>document.getElementById("colorBlock");
    const colorProp = <HTMLTextAreaElement>document.getElementById("colorProp");

    typographyName.innerHTML = response.typographyName;

    //modify msg 
    var message = response.message;
    var typographyNameTx = response.typographyName;


    //
    var typTrimDashes = typographyNameTx.replace(/(\-)/gi,"");//typographyNameTx.;
    var typTrimed = trimForwardSlash(typTrimDashes);
    var sudoTypog = camelCase(typTrimed);
    console.log("sudoTypog",sudoTypog);

    var sampleObj = {};
    sampleObj[sudoTypog] = message;




    //componentInfo.innerHTML = JSON.stringify(response.message, null, 4);
    componentInfo.innerHTML = JSON.stringify(sampleObj, null, 4);
    
    const cssObj = response.message;



    textPreview.innerHTML = "";
    const elemTp = document.createElement("SPAN");
    textPreview.appendChild(elemTp);

    elemTp.innerHTML = response.content;

    console.log("cssObj", cssObj);

    spread(elemTp.style, cssObj);


    //color
    colourName.innerHTML = response.colourName;

    colorBlock.style.backgroundColor = response.colour;
    colorProp.innerHTML = response.colour;

  }

};
