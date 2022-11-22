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
    
   };

module.exports = tagModule;