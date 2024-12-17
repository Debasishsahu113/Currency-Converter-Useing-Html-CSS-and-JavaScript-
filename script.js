const BASE_URL =
   "https://v6.exchangerate-api.com/v6/1235a8729db22d5bbf55d8a7/latest"
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for(currcode in countryList){
           //console.log(code);
           let newOption=document.createElement("option")
               newOption.innerText=currcode;
               newOption.value=currcode;
                if(select.name==="from" && currcode==="USD"){
                    newOption.selected="selected";
                }
                else if(select.name==="to" && currcode==="INR"){
                    newOption.selected="selected";

                }
               select.append(newOption);
         }
         select.addEventListener("change",(evnt)=>{
            updateflag(evnt.target);
         });
}
const updateExchange= async ()=>{
    let amount= document.querySelector(".amount input");
let amtval=amount.value;
console.log(amtval);
if(amtval==="" || amtval<1){
    amtval=1;
    amount.value="1";
}
console.log(fromCurr.value);
console.log(toCurr.value);

const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}`;//create our own link
fetch(URL).then(Response=>Response.json()).then(result=>{
    let exchangeRate=result.conversion_rates[toCurr.value]
    console.log(exchangeRate);
    let finalAmount=[amtval* exchangeRate];
    msg.innerText=`${amtval} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`;
});
};

const updateflag=(element)=>{//for flg change
    console.log(element)
    let currCode=element.value;
    console.log(currCode); 
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
       let img=element.parentElement.querySelector("img");
    img.src=newSrc;

};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
   updateExchange();
    });

    window.addEventListener("load",()=>{
        updateExchange();
     });
    
    
   ///${toCurr.value.toLowerCase()}
   //const URL = `${BASE_URL}?from=${fromCurr.value}&to=${toCurr.value}&amount=${amtval}`;
  
   // console.log(URL);

    // let response= await fetch(URL);
    // let data= await response.json();
    // let rate=data[toCurr.value.toLowerCase()];
    // console.log(rate);
