const listModule = {

    showAddListModal(){
        document.getElementById('addListModal').classList.add('is-active');
        document.querySelector("#addListModal .input").focus();
        },

    async handleAddListForm(event){
            event.preventDefault();
            const formElem = event.target;
            const formDataObject= new FormData(formElem);
          
            //we call the API to send the new list
            try {
                  const response = await fetch(`${app.base_url}/lists`, {
                      method: 'POST',
                body: formDataObject,
                  });
          
              if (!response.ok) throw new Error(response);
              const createdList = await response.json();
          
              app.makeListInDOM(createdList);
          
              } catch (error) {
                alert("Impossible to create the list")
              }
          
            const listName= formDataObject.get('name');
            app.makeListInDOM(listName);
            app.hideModals();
          },

    makeListInDOM(listObject){
            const template = document.getElementById('template-list');
            const newListElem= document.importNode(template.content, true);
            newListElem.querySelector('h2').textContent=listObject.name;
            //change list id 
            //const newId= 'list' + Date.now();
            newListElem.querySelector('.panel').dataset.listId= listObject.name;
            
            newListElem.querySelector('button-add-card').addEventListener('click',app.showAddCardModal)
            const listContainer=document.querySelector('#list-container');
            listContainer.appendChild(newListElem);
            },     
   };

module.exports = listModule;