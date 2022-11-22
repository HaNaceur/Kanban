const tagModule = {

    makeTagInDom(tag){
        //ceate html element 
        const tagElem = document.createElement('span')
        tagElem.textContent = tag.name;
        tagElem.classList.add('tag');
        tagElem.style.backgroundColor = tag.color;
        tagElem.dataset.tagId = tag.id;
        //insert the tag on the card he belongs
        const parentCardId = tag.card_has_tag.card_id;
        const parentCardElem = document.querySelector(`[data-card-id="${parentCardId}"]`);
        parentCardElem.appendChild(tagElem);
        },
    
    async showAssociateTagToCardModale(event){
        const modalElem = document.querySelector('#addTagToCardModal');
     
        modalElem.classList.add('is-active');

        const selectElem = modalElem.querySelector('select');



        try {
            const response = await fetch(`${utilsModule.base_url}/tags`);

            if (!response.ok) throw new Error(response);

            const tagList = await response.json();
            console.log(tagList);

            for (const tag of tagList) {

                const optionElem = document.createElement('option');

                optionElem.textContent = tag.name;

                optionElem.value = tag.id;

                selectElem.appendChild(optionElem);
                
            }

        } catch (error) {
            alert("Impossible to retrieve the list of tags");
            console.error(error);
        }
    },
    
   };

module.exports = tagModule;