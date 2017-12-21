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

  var initTables = function() {
    var tabNavigationLinks = document.querySelectorAll("a.app-tabs__item");
    [].forEach.call(tabNavigationLinks, el => {
      populateTable(el.innerHTML);
    })
  }();

  function populateTable(tableId) {
    var arr = getFromLocalStorage(tableId);
    var container = document.getElementById(tableId);
    arr.forEach(el => {
        renderItem(el, container);
    });
  }

  function resetForm() {
    Form.reset();
    ButtonAdd.innerHTML = 'Add';
    ButtonAdd.classList.remove('btn--blue');
    ButtonAdd.classList.add('btn--green');
  }

  function getElementFromTemplate() {
    if ('content' in template) {
      var element = template.content.children[0].cloneNode(true);
    } else {
      var element = template.children[0].cloneNode(true);
    };
    return element;
  }

  ButtonAdd.addEventListener('click', function (event) {
    var item = {done: false, name: ItemName.value, quantity: ItemQuantity.value, price: ItemPrice.value};
    let validationMessage = validateItem(item);
    if(validationMessage) {
      event.preventDefault();
      alert(validationMessage);
    } else {
      if(this.innerHTML === 'Add') {
        pushToArr(getCurrentSectionName() ,item);
        renderItem(item);
      } else {
        var element = document.querySelector(".editable");
        var id = Number(element.firstElementChild.innerHTML) - 1;
        updateArrElem(ActiveItemsTable.id, id, item);
        copyItem(element, item);
        resetForm();
        sum();
        ActiveItemsTable.style.pointerEvents = 'auto';
        element.classList.remove('editable');
        element.style.backgroundColor = 'initial';
      }
    };
  });

  function validateItem(item) {   
    if(!item.name || !item.quantity || !item.price) {
        return "All fields are required";
    }
    if(isNaN(item.price) || item.price <= 0) {
        return "'Price' is invalid";
    }
    return "";                
}

  function renderItem(item, container) {
    var element = getElementFromTemplate();
    var container = container || Container;
    container.appendChild(element);
    copyItem(element, item);
    calcPosition()
    sum();
    resetForm();
    doneItem(element);
    initEdit(element);
    initDelete(element);
  };


  function calcPosition() {
    [].forEach.call(Tables, function (el) {
      [].forEach.call(el.querySelectorAll('.counter'), function (number, index) {
        number.innerHTML = index + 1;
      });
    });
  }

  function copyItem(parent, item) {
    if(parent && item) {
      parent.querySelector('.list__name').innerHTML = item.name;
      parent.querySelector('.list__quantity').innerHTML = item.quantity;
      parent.querySelector('.list__price').innerHTML = +item.price;
      parent.querySelector('.list__done').checked = item.done;
    }
  }
    function initDelete(element) {
      var container = element.parentElement;
      if(container !== DeletedItemsTable) {
        element.querySelector(".btn--deleted").addEventListener('click', RemoveItemsinDelete.bind(element, container));
      } else {
        element.querySelector(".btn--deleted").addEventListener('click', function() {
          if(window.confirm('Delete the item permanently?')) {
            var tr = getParents(this, 'tr')[0]
            var id = Number(tr.firstElementChild.innerHTML) - 1;
            deleteFromArr(DeletedItemsTable.id, id);
            DeletedItemsTable.removeChild(tr);
            sum();
          }
        });
      }

  }
    function RemoveItemsinDelete(container) {
      var Button = this.querySelector('.btn--deleted');
      var tr = getParents(Button, 'tr')[0];
      var id = Number(tr.firstElementChild.innerHTML) - 1;
      var deleted = deleteFromArr(container.id, id);
      pushToArr(DeletedItemsTable.id, deleted);
      var DeletedItem = tr.cloneNode(true);
      DeletedItemsTable.appendChild(DeletedItem);
      container.removeChild(tr);
      var DeleteButton = DeletedItem.querySelector('.btn--edit');
      DeleteButton.style.display = 'none';
        sum();
        calcPosition();
        initDelete(DeletedItem);
    }
    function doneItem(element) {
      element.querySelector('.list__done').addEventListener('click', function() {

        var container = getParents(this, 'table')[0];
        if (container !== DeletedItemsTable) {
          var tr = getParents(this, 'tr')[0];
          var id = Number(tr.firstElementChild.innerHTML) - 1;
          var DoneItem = tr.cloneNode(true);
          if (this.checked) {
            var deleted = deleteFromArr(ActiveItemsTable.id, id);
            deleted.done = true;
            pushToArr(DoneItemsTable.id, deleted);
            DoneItem.querySelector('.list__done').checked;
            DoneItemsTable.appendChild(DoneItem);
            ActiveItemsTable.removeChild(tr);
          } else {
            var deleted = deleteFromArr(DoneItemsTable.id, id);
            deleted.done = false;
            pushToArr(ActiveItemsTable.id, deleted);
            DoneItem.querySelector('.list__done').checked = false;
            ActiveItemsTable.appendChild(DoneItem);
            DoneItemsTable.removeChild(tr);
          }
          doneItem(DoneItem);
          initDelete(DoneItem);
          initEdit(DoneItem);
          sum();
          calcPosition();
        }
      });
                
    }
      
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

  
    function editItem(element) {
      var id = Number(element.firstElementChild.innerHTML) - 1;
      element.style.backgroundColor = 'skyblue';
      element.classList.add('editable');

      var item = getFromLocalStorage(ActiveItemsTable.id)[id];
      ItemName.value = item.name;
      ItemQuantity.value = item.quantity;
      ItemPrice.value = item.price;

      ButtonAdd.classList.remove('btn--green');
      ButtonAdd.classList.add('btn--blue');
      ButtonAdd.innerHTML = 'Update';

      ActiveItemsTable.style.pointerEvents = 'none';
    }

      function initEdit(element) {
        var container = element.parentElement;
        var editButton = element.querySelector(".btn--edit");
        if(container === ActiveItemsTable) {
          editButton.style.display = 'initial';
          editButton.addEventListener('click', editItem.bind(element, element));
        } else {
          editButton.style.display = 'none';
        }
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

  /* Utility functions */
  function getFromLocalStorage(name, isArr = true) {
    return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : (isArr? [] : {})
  }

  function setToLocalStorage(name, obj) {
    localStorage.setItem(name, JSON.stringify(obj));
  }

  function deleteFromArr(arrName, id) {
    let arr = getFromLocalStorage(arrName);
    let deleted = arr.splice(id, 1);
    setToLocalStorage(arrName, arr);
    return deleted[0];
  }

  function pushToArr(arrName, item) {
      let arr = getFromLocalStorage(arrName);
      arr.push(item);
      setToLocalStorage(arrName, arr);
  }

  function insertToArr(arrName, id, item) {
      let arr = getFromLocalStorage(arrName);
      arr.splice(id, 0, item);
      setToLocalStorage(arrName, arr);
  }

  function updateArrElem(arrName, id, newItem) {
    let arr = getFromLocalStorage(arrName);
    arr[id] = newItem;
    setToLocalStorage(arrName, arr);
  }

  function getCurrentSectionName() {
    return document.querySelector("a.is-active").innerHTML;
  }
})();
