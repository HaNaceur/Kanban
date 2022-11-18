const app = {

  base_url= "http://localhost:3000/api",

  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.showAddListModal();
    app.hideModals();
    app.handleAddListForm();
    app.makeListInDOM();
    app.showAddCardModal();
    app.getListsFromAPI();
  },

addListenerToActions(){
 const addListButtonElem= document.getElementById('addListButton');
 addListButtonElem.addEventListener('click', app.showAddListModal);
 const closeModalButtonElemList= document.querySelectorAll('.close');
 for (const buttonElem of closeModalButtonElemList){
 buttonElem.addEventListener('click',app.hideModals);
}
const addListFormElem=document.querySelector('#addListModal form');
addListFormElem.addEventListener('submit',app.handleAddListForm);
const addCardButtonElemList= document.querySelectorAll('.button-add-card');
for (const buttonElem of addCardButtonElemList){
  buttonElem.addEventListener('click',app.showAddCardModal);
 }
 const addCardFormElem=document.querySelector('#addCardModal form');
 addCardFormElem.addEventListener('submit',app.handleAddCardForm);

},

showAddListModal(){
document.getElementById('addListModal').classList.add('is-active');
document.querySelector("#addListModal .input").focus();

},

hideModals(){
  const modalElemList= document.querySelectorAll('.modal')
  for (const modalElem of modalElemList){
  modalElemList.classList.remove('is-active');
}
},

handleAddListForm(event){
  event.preventDefault();
  const formElem = event.target;
  const formDataObject= new FormData(formElem);
  const listName= formDataObject.get('name');
  app.makeListInDOM(listName);
  app.hideModals();
},

makeListInDOM(listName){
const template = document.getElementById('template-list');
const newListElem= document.importNode(template.content, true);
newListElem.querySelector('h2').textContent=listName;
//change list id 
const newId= 'list' + Date.now();
newListElem.querySelector('.panel').dataset.listId= newId;

newListElem.querySelector('button-add-card').addEventListener('click',app.showAddCardModal)
const listContainer=document.querySelector('#list-container');
listContainer.appendChild(newListElem);
},

showAddCardModal(event){
const modalElem=document.getElementById('addCardModal');
modalElem.classList.add('is-active');
const listElem=event.target.closest('.panel');
const listId = listElem.dataset.listId;
console.log('Id de la liste cliquée :' + listId);
const hiddenInputElem = modalElem.querySelector('input[name="list_id"]');
hiddenInputElem.value = listId;
},

handleAddCardForm(event){
event.preventDefault();
const formDataObject=new FormData(formElem);
app.makeCardInDOM(formDataObject);
app.hideModals();
},

makeCardInDOM(formDataObject){
const templateElem=document.getElementById('template-card');
const newCard=document.importNode(templateElem.content, true);
const cardContent=formDataObject.get('content');
newCard.querySelector('.card-name').textContent=cardContent;
const parentListId=formDataObject.get('list_id');
const theGoodListElem =document.querySelector(`[data-list-id="${parentListId}"]`);
theGoodListElem.querySelector('.panel-block').appendChild(newCard);
  },
  

async getListsFromAPI (){
  try{
    const response = await fetch(`${app.base_url}/lists`)
    if (!response.ok) throw new Error (response);
    const lists= await response.json();
  } catch (error){
      alert("Impossible to retieve the lists form the API");
      console.log(error);
    }
  }

};

document.addEventListener('DOMContentLoaded', app.init);