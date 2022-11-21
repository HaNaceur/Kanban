const cardModule = {
    showAddCardModal(event){
        const modalElem=document.getElementById('addCardModal');
        modalElem.classList.add('is-active');
        const listElem=event.target.closest('.panel');
        const listId = listElem.dataset.listId;
        console.log('Id de la liste cliquée :' + listId);
        const hiddenInputElem = modalElem.querySelector('input[name="list_id"]');
        hiddenInputElem.value = listId;
        },
    
    

async handleAddCardForm(event){
    event.preventDefault();
    const formDataObject=new FormData(event.target);
    
      //we call the API to send the new card
      try {
            const response = await fetch(`${utilsModule.base_url}/cards`, {
                method: 'POST',
          body: formDataObject,
            });
    
        if (!response.ok) throw new Error(response);
        const createdCard = await response.json();
    
        app.makeCardInDOM(createdCard);
    
        } catch (error) {
          alert("Impossible to create the list")
        }
    
    utilsModule.hideModals();
    },

    makeCardInDOM(cardObject){
        const templateElem=document.getElementById('template-card');
        
        const newCard=document.importNode(templateElem.content, true);
        
        const cardContent=cardObject.content;
        
        newCard.querySelector('.card-name').textContent=cardContent;
        //to attribute the id from the API to the cards 
        newCard.querySelector('.box').dataset.cardId=cardObject.id;
        
        newCard.querySelector('.box').style.backgroundColor = cardObject.color;
        
        const parentListId=cardObject.list_id;
        
        const theGoodListElem =document.querySelector(`[data-list-id="${parentListId}"]`);
        
        theGoodListElem.querySelector('.panel-block').appendChild(newCard);
          },
    
    
};