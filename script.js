const url="https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";
const all_cards=document.getElementById('all-cards')
async function fetchData() {
    try {
      const response = await fetch(url);
      const result = await response.json();
      getMenu(result)
    } catch (error) {
      console.log('error fetching');
    }
  }
// getMenu function
function getMenu(data) {
    console.log('Menu :',data);
    //          <div class="cards mb-4  mx-auto">
    //             <div class="img mx-auto d-flex align-items-center">
    //               <img class="w-100" src="https://source.unsplash.com/random/1920x1080/?pizza" alt="Pizza" />
    //             </div>
    //             <div class="content d-flex justify-content-between">
    //               <p>Pizza</p>
    //               <img src="./Assets/plus (1) 1.svg" />
    //             </div>
    //             <p class="price py-2">$8.99/-</p>
    //           </div>
    //           <div class="cards mb-4 mx-auto">
    //             <div class="img mx-auto d-flex align-items-center">
    //               <img class="w-100" src="https://source.unsplash.com/random/1920x1080/?tacos" alt="burger" />
    //             </div>
    //             <div class="content d-flex justify-content-between">
    //               <p>Tacos</p>
    //               <img src="./Assets/plus (1) 1.svg" />
    //             </div>
    //             <p class="price py-2">$3.99/-</p>
    //           </div>
  data.forEach((card)=>{
    const cardContainer=document.createElement('div');
    // let names=card.name.toLowerCase();
    cardContainer.className='cards mb-4  mx-auto';
    cardContainer.innerHTML=`<div class="img mx-auto d-flex align-items-center">
                             <img class="w-100" src="${card.imgSrc}" alt="${card.name}" />
                         </div>
                         <div class="content d-flex justify-content-between">
                           <p>${card.name}</p>
                           <img src="./Assets/plus (1) 1.svg" />
                         </div>
                         <p class="price py-2">${card.price}</p> `
    all_cards.appendChild(cardContainer);

  })
  }
  

async function takeOrder(){
  try{
    const response=await fetch(url);
    const data=await response.json();
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        const orders=[];
        for(let i=0;i<3;i++){
          const randomIndex=Math.floor(Math.random()*data.length);
          orders.push(data[randomIndex].name);
        }
        resolve(orders);
        console.log('Orders ',orders);
      },2000)
    })
  }
  catch(error){
    console.log('error in take order:',error);
  }
}
  
  
  // orderPrep function
  function orderPrep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: false
        };
        if(orderStatus.order_status==true && orderStatus.paid==false){
            resolve(orderStatus);
            console.log('order prep:',orderStatus);
        }else
            reject(orderStatus);
      }, 1500);
    });
  }
  
  // payOrder function
  function payOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: true
        };
        if(orderStatus.order_status===true && orderStatus.paid==true){
            resolve(orderStatus);
            console.log('payment:',orderStatus);
        }
        else{
            reject('Payment failed',orderStatus);
        }
      }, 1000);
    });
  }
  
  // thankyouFnc function
  function thankyouFnc() {
    alert('Thank you for eating with us today!');
  }
  

  async function restaurantProcess(){
    try{
      await fetchData()
      await takeOrder();
      await orderPrep();
      const payorder = await payOrder();
      if(payorder.paid){
        thankyouFnc();
      }
    }
    catch(error){
      console.log('error',error);
    }
  }
  restaurantProcess();
  