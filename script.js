// getMenu function
function getMenu() {
    return fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching menu:', error);
      });
  }
  
 // TakeOrder function
function takeOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const menu = ['Cheeseburger', 'Pizza', 'Tacos', 'Sushi', 'Pasta'];
        const burgers = [];
        
        // Select 3 random burgers from the menu
        while (burgers.length < 3) {
          const randomIndex = Math.floor(Math.random() * menu.length);
          const randomBurger = menu[randomIndex];
          if (!burgers.includes(randomBurger)) {
            burgers.push(randomBurger);
          }
        }
  
        const order = {
          burgers: burgers
        };
  
        resolve(order);
      }, 2500);
    });
  }
  
  
  // orderPrep function
  function orderPrep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: false
        };
        if(orderStatus.order_status==true){
            resolve(orderStatus);
        }
        else{
            reject(orderStatus);
        }
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
        if(orderStatus.paid===true){
            resolve(orderStatus);
        }
        else{
            reject(orderStatus);
        }
      }, 1000);
    });
  }
  
  // thankyouFnc function
  function thankyouFnc() {
    alert('Thank you for eating with us today!');
  }
  
  // Promise chaining
  getMenu()
    .then(() => {
      return takeOrder();
    })
    .then(order => {
      console.log('Order:', order);
      return orderPrep();
    })
    .then(orderStatus => {
      console.log('Order Preparation:', orderStatus);
      return payOrder();
    })
    .catch(orderStatus =>{
        console.log('Order Prerparation:',orderStatus);
        console.log("Preparation Unsucessfull");
    })
    .then(orderStatus => {
      console.log('Order Paid:', orderStatus);
        thankyouFnc();
    })
    .catch(orderStatus=>{
        console.log('Order Paid:',orderStatus);
        console.log("Payment Unsucessfull");
    })
    .catch(error => {
      console.error('Error:', error);
    });
  