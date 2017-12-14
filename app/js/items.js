(function () {
    var ItemList = document.querySelector('.shopping-list__fields');
    var ItemName = ItemList.querySelector('#item');
    var ItemQuantity = ItemList.querySelector('#quantity');
    var ItemPrice = ItemList.querySelector('#price');
    var ButtonAdd = ItemList.querySelector('.btn');
    var Form = ItemList.querySelector('form');
    var Container = document.querySelector('.list');
    var ItemSum = Container.querySelector('.list__sum');
    var template = document.querySelector('#good-template');
    var ActiveItemsTable = document.querySelector('.active');
    var DoneItemsTable = document.querySelector('.done');
    var DeletedItemsTable = document.querySelector('.deleted');


    Form.addEventListener('change', function (event) {
        if (!ItemName.value || !ItemQuantity.value || !ItemPrice.value) {
            event.preventDefault();
        } else {
            ButtonAdd.innerHTML = 'Update';
            ButtonAdd.classList.remove('btn--green');
            ButtonAdd.classList.add('btn--blue');
        }
    });

    function getElementFromTemplate(data) {
        if ('content' in template) {
            var element = template.content.children[0].cloneNode(true);
        } else {
            var element = template.children[0].cloneNode(true);
        };
        return element;
    }

    
    
        ButtonAdd.addEventListener('click', function (event) {
        if (!ItemName.value || !ItemQuantity.value || !ItemPrice.value) {
            event.preventDefault();
        } else {
            renderItems(item);
            CopyItem();
            EditandDeletedItem()
            ItemSum.innerHTML = sum();
        };
    });


    function renderItems(Items) {
        var element = getElementFromTemplate(item);
        Container.appendChild(element);
        var ListNumber = Container.querySelectorAll('.counter');
        for (var i = 0; i < ListNumber.length; i++) {
            ListNumber[i].innerHTML = Container.rows[i].rowIndex;
        };
    };

    function CopyItem() {
        var templateItem = Container.querySelector('.list__name');
        for (var i = 0; i < templateItem.length; i++) {
            templateItem.innerHTML = ItemName.value;
        }
        var templateQuantity = Container.querySelectorAll('.list__quantity');
        for (var i = 0; i < templateQuantity.length; i++) {
            templateQuantity[i].innerHTML = ItemQuantity.value;
        }
        var templatePrice = Container.querySelectorAll('.list__price');
        for (var i = 0; i < templatePrice.length; i++) {
            templatePrice[i].innerHTML = ItemPrice.value;
        }
    }

    function EditandDeletedItem() {
        var ButtonEdit = ActiveItemsTable.querySelector('.btn--edit');
        var ButtonDelete = ActiveItemsTable.querySelector('.btn--deleted');

        ButtonEdit.onclick = function () {
            ButtonEdit.parentNode.parentNode.style.backgroundColor = 'skyblue';
        }
        ButtonDelete.onclick = function () {
        var DeletedItem = ButtonDelete.parentNode.parentNode.cloneNode(true);
        DeletedItemsTable.insertBefore(DeletedItem, DeletedItemsTable.children[1]);
        ActiveItemsTable.removeChild(ButtonDelete.parentNode.parentNode);
        var DeleteButton = DeletedItem.querySelector('.btn--edit');
        DeleteButton.style.display = 'none';
        Delete();
        }

        var templateDone = Container.querySelector('.list__done');
        templateDone.onclick = function () {

        if (this.checked) {
            var DoneItem = templateDone.parentNode.parentNode.cloneNode(true);
            DoneItemsTable.insertBefore(DoneItem, DoneItemsTable.children[1]);
            ActiveItemsTable.removeChild(templateDone.parentNode.parentNode);
            var DoneButton = DoneItem.querySelector('.btn--edit');
            DoneButton.style.display = 'none';
            var ButtonDeleteinDone = DoneItemsTable.querySelector('.btn--deleted');
            ButtonDeleteinDone.onclick = function () {
            var DeletedIteminDone = ButtonDeleteinDone.parentNode.parentNode.cloneNode(true);
            DeletedItemsTable.insertBefore(DeletedIteminDone, DeletedItemsTable.children[1]);
            DoneItemsTable.removeChild(ButtonDeleteinDone.parentNode.parentNode);
            Delete();
                }
            }
        };
    }

    function sum() {
        var result = 0;
        var ListPrice = Container.querySelectorAll('.list__price');
        for (var i = 0; i < ListPrice.length; i++) {
            var ListPriceValue = ListPrice[i].innerHTML;
        };
        for (var i = 0; i < ListPriceValue.length; i++) {
            result += parseInt(ListPriceValue);
              
            return result;
        }
    }

    function Delete() {
        var ButtonDeleteinDelete = DeletedItemsTable.querySelector('.btn--deleted');
        if (ButtonDeleteinDelete) {
            ButtonDeleteinDelete.onclick = function () {
            DeletedItemsTable.removeChild(ButtonDeleteinDelete.parentNode.parentNode);
            }
        };
    }

})();
