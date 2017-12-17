(function () {
  var ItemList = document.querySelector('.shopping-list__fields');
  var ItemName = ItemList.querySelector('#item');
  var ItemQuantity = ItemList.querySelector('#quantity');
  var ItemPrice = ItemList.querySelector('#price');
  var ButtonAdd = ItemList.querySelector('.btn');
  var Form = ItemList.querySelector('form');
  var Container = document.querySelector('.active');
  var Tables = document.querySelectorAll('.list');
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

  function resetForm() {
    [].forEach.call(Form.querySelectorAll('input'), function (el) {
      el.value = '';
    });

    ButtonAdd.innerHTML = 'Add';
    ButtonAdd.classList.remove('btn--blue');
    ButtonAdd.classList.add('btn--green');
  }

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
      renderItems();
    };
  });

  function renderItems() {
    var element = getElementFromTemplate(item);
    Container.appendChild(element);
    CopyItem(element);
    initDelete();
    DoneItems();
    calcPosition()
    sum();
    resetForm();
    initEdit();

  };

  function calcPosition() {
    [].forEach.call(Tables, function (el) {
      [].forEach.call(el.querySelectorAll('.counter'), function (number) {
        number.innerHTML = number.parentNode.rowIndex;
      });
    });
  }


  function CopyItem(parent) {
    parent.querySelector('.list__name').innerHTML = ItemName.value;
    parent.querySelector('.list__quantity').innerHTML = ItemQuantity.value;
    parent.querySelector('.list__price').innerHTML = ItemPrice.value;
  }
    function initDelete() {
        [].forEach.call(document.querySelectorAll('.btn--deleted'), function (el) {
      el.addEventListener('click', RemoveItemsinDelete);
    });
  }
    function RemoveItemsinDelete() {
        var Button = document.querySelector('.btn--deleted');
      var DeletedItem = Button.parentNode.parentNode.cloneNode(true);
             DeletedItemsTable.insertBefore(DeletedItem, DeletedItemsTable.children[1]);
      ActiveItemsTable.removeChild(Button.parentNode.parentNode);
      var DeleteButton = DeletedItem.querySelector('.btn--edit');
      DeleteButton.style.display = 'none';
      Delete();
        sum();
        calcPosition();
    }
      function DoneItems() {
      [].forEach.call(Container.querySelectorAll('.list__done'), function (el) {
      el.addEventListener('click', function() {
            if (el.checked) {
        var DoneItem = el.parentNode.parentNode.cloneNode(true);
        DoneItemsTable.insertBefore(DoneItem, DoneItemsTable.children[1]);
        ActiveItemsTable.removeChild(el.parentNode.parentNode);
        var DoneButton = DoneItem.querySelector('.btn--edit');
        DoneButton.style.display = 'none';
        var ButtonDeleteinDone = DoneItemsTable.querySelector('.btn--deleted');
        ButtonDeleteinDone.onclick = function () {
          var DeletedIteminDone = ButtonDeleteinDone.parentNode.parentNode.cloneNode(true);
          DeletedItemsTable.insertBefore(DeletedIteminDone, DeletedItemsTable.children[1]);
          DoneItemsTable.removeChild(ButtonDeleteinDone.parentNode.parentNode);
        }
         Delete();
            sum();
        calcPosition();
      }
      });
                
    });
  };
      
  function sum() {
      [].forEach.call(Tables, function (el) {
      var result = 0;
      var ListPrice = el.querySelectorAll('.list__price');
        var ItemSum = el.querySelector('.list__sum');
      for (var i = 0; i < ListPrice.length; i++) {
        result += +ListPrice[i].innerHTML;
      };
      ItemSum.innerHTML = result;
    });
  }


  function Delete() {
       [].forEach.call(DeletedItemsTable.querySelectorAll('.btn--deleted'), function (el) {
      el.addEventListener('click', function() {
          DeletedItemsTable.removeChild(el.parentNode.parentNode);
      });
    });
}
  
    function editItem() {
var parent = getParents(this, 'tr')[0];

    [].forEach.call(ActiveItemsTable.querySelectorAll('.list__item--copy'), function (el) {
        el.style.backgroundColor = 'skyblue';

    });

    ButtonAdd.classList.remove('btn--green');
    ButtonAdd.classList.add('btn--blue');
    ButtonAdd.innerHTML = 'Update';

    ButtonAdd.onclick = updateItem;

  
    function getData(type) {
       
      return parent.querySelector('[data-type=' + type + ']').innerHTML;
    }

    
    function setData(type, value) {
      Form.querySelector('[data-type=' + type + ']').value = value;
    }

   
    setData('item', getData('item'));
    setData('price', getData('price'));
    setData('quantity', getData('quantity'));
  }
      function updateItem() {
    var parent = document.querySelector('tr.table-primary');

   CopyItem(parent);
    resetForm();
    calcSum();
  }
      function initEdit() {
    [].forEach.call(ActiveItemsTable.querySelectorAll('.btn--edit'), function (el) {
      el.addEventListener('click', editItem);
    });
  }
  var getParents = function (elem, selector) {

    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

 
    var parents = [];

   
    for (; elem && elem !== document; elem = elem.parentNode) {

     
      if (selector) {
        if (elem.matches(selector)) {
          parents.push(elem);
        }
      } else {
        parents.push(elem);
      }

    }

    return parents;

  };

})();
