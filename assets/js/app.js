
// on objet qui contient des fonctions
const app = {

  // fonction d'initialisation, lancée au chargement de la page
  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
    app.showAddListModal();
    app.hideModals();
    app.handleAddListForm();
    app.makeListInDOM();
  },




addListenerToActions(){
 const addListButtonElem= document.getElementById('addListButton');
 addListButtonElem.addEventListener('click', app.showAddListModal);
 const closeModalButtonElemList= document.querySelectorAll('.close')
 for (const buttonElem of closeModalButtonElemList){
 buttonElem.addEventListener('click',app.hideModals);
}

  document.querySelector('form').addEventListener('submit',app.handleAddListForm);
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
  const formData= new FormData(formElem);
  const data = Object.fromEntries(formData);
  },

makeListInDOM(){
const template = document.getElementById('my-paragraph');
const templateContent = template.content;
document.body.appendChild(templateContent);
 maListe.querySelector
  }

}

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init );