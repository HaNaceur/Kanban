const listModule = require("./listModule");

const app = {

  base_url : "http://localhost:3000/api",

  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.showAddListModal();
    app.hideModals();
    app.handleAddListForm();
    app.makeListInDOM();
    app.showAddCardModal();
    app.getDataFromAPI();
  },

addListenerToActions(){
 const addListButtonElem= document.getElementById('addListButton');
 addListButtonElem.addEventListener('click', listModule.showAddListModal);
 const closeModalButtonElemList= document.querySelectorAll('.close');
 for (const buttonElem of closeModalButtonElemList){
 buttonElem.addEventListener('click',utilsModule.hideModals);
}
const addListFormElem=document.querySelector('#addListModal form');
addListFormElem.addEventListener('submit',listModule.handleAddListForm);
const addCardButtonElemList= document.querySelectorAll('.button-add-card');
for (const buttonElem of addCardButtonElemList){
  buttonElem.addEventListener('click',cardModule.showAddCardModal);
 }
 const addCardFormElem=document.querySelector('#addCardModal form');
 addCardFormElem.addEventListener('submit',cardModule.handleAddCardForm);

},


async getDataFromAPI (){
  try{
    const response = await fetch(`${utilsModule.base_url}/lists`)
    if (!response.ok) throw new Error (response);
    const lists= await response.json();
    console.log(lists);

    // for each list we call the method makeListInDOM
    for (const listObject of lists){
      listModule.makeListInDOM(listObject);

      //for each card of each list we call the method makeCardInDom
      for (const cardObject of listObject.cards){
        app.makeCardInDOM(cardObject);
    }
  }

  } catch (error){
      alert("Impossible to retieve the lists form the API");
      console.error(error);
    }
  }

};

document.addEventListener('DOMContentLoaded', app.init);