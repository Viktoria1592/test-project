(function() {
  var ItemList = document.querySelector('.shopping-list__fields');
  var ItemName = ItemList.querySelector('#item');
   var ItemQuantity = ItemList.querySelector('#quantity');
   var ItemPrice = ItemList.querySelector('#price');
  var ButtonAdd = ItemList.querySelector('.btn');
  var Form = ItemList.querySelector('form');
  var ItemElements = ItemList.querySelectorAll('.shopping-list__input');
  var Container = document.querySelector('.list');
  var ItemSum  = Container.querySelector('.list__sum');
  var template = document.querySelector('#good-template');
   var ActiveItemsTable = document.querySelector('.active');
  var DoneItemsTable = document.querySelector('.done');
  var DeletedItemsTable = document.querySelector('.deleted');

//  var templateItem = template.querySelector('.list__item');
//  var templateQuantity = template.querySelector('.list__quantity');
//  var templatePrice = template.querySelector('.list__price');

//  var ListNumber = Container.querySelector('.counter');

//  if (ItemName.value && ItemQuantity.value && ItemPrice.value) {
//      ButtonAdd.innerHTML = 'Update';
//  ButtonAdd.classList.remove('btn--green');
//  ButtonAdd.classList.add('btn--blue');
//
//      };
//
//  console.log (ItemName.value);
//  console.log (ItemPrice.value);
//
//ItemElements.onchange = function() {
//  console.log (ItemName.value);
//}



    Form.addEventListener('change', function (event) {
        if (!ItemName.value || !ItemQuantity.value|| !ItemPrice.value) {
            event.preventDefault();
        }
        else {
            ButtonAdd.innerHTML = 'Update';
  ButtonAdd.classList.remove('btn--green');
  ButtonAdd.classList.add('btn--blue');
        }
    });
    function getElementFromTemplate(data) {
//     var template = document.querySelector('#good-template');
    if ('content' in template) {
    var element = template.content.children[0].cloneNode(true);

    } else {
        var element = template.children[0].cloneNode(true);
    };
//      for (var i = 1; i < ListNumber.length; i++) {
//    ListNumber.innerHTML = i;
//  };
      return element;
}
//  function sendItem() {
//    var formData = new FormData(Form);
//var xhr = new XMLHttpRequest();
//    xhr.open('POST', 'data/items.json');
//        xhr.onload = function(evt) {
//      var rawData = evt.target.response;
//      var loadedHotels = JSON.parse(rawData);
//        console.log(loadedHotels);
//    };
//  xhr.send(formData);
//  }

//function renderItems(Items) {
    ButtonAdd.addEventListener('click', function (event) {
        if (!ItemName.value || !ItemQuantity.value|| !ItemPrice.value) {
            event.preventDefault();
        }
        else {
//sendItem();
//          var formData = new FormData(Form);
//           xhr.send(formData);
         renderItems(item);
          CopyItem();
           ItemSum.innerHTML = sum();



          EditandDeletedItem()
//          templateItem.innerHTML = ItemName.value;
    };
    });
//}


  function renderItems(Items) {
    var element = getElementFromTemplate(item);
          Container.appendChild(element);
     var ListNumber = Container.querySelectorAll('.counter');
     for (var i = 0; i < ListNumber.length; i++) {
    ListNumber[i].innerHTML = i;
  };
// var templateItem = Container.querySelectorAll('.list__name');
//    for (var i = 0; i < templateItem.length; i++) {
//      templateItem[i].innerHTML = ItemName.value;
//    }
//  var templateQuantity = Container.querySelectorAll('.list__quantity');
//     for (var i = 0; i < templateQuantity.length; i++) {
//      templateQuantity[i].innerHTML = ItemQuantity.value;
//    }
//  var templatePrice = Container.querySelectorAll('.list__price');
//     for (var i = 0; i < templatePrice.length; i++) {
//      templatePrice[i].innerHTML = ItemPrice.value;
//    }



  };

  function CopyItem() {
    var templateItem = Container.querySelectorAll('.list__name');
    for (var i = 0; i < templateItem.length; i++) {
      templateItem[i].innerHTML = ItemName.value;
    }
  var templateQuantity = Container.querySelectorAll('.list__quantity');
     for (var i = 0; i < templateQuantity.length; i++) {
      templateQuantity[i].innerHTML = ItemQuantity.value;
    }
  var templatePrice = Container.querySelectorAll('.list__price');
     for (var i = 0; i < templatePrice.length; i++) {
      templatePrice[i].innerHTML = ItemPrice.value;
    }
//    ItemSum.innerHTML = sum();


  }
//  var ButtonEdit = Container.querySelectorAll('.btn--edit');
//   var ButtonDelete = Container.querySelectorAll('.btn--deleted');

//   ButtonEdit.onclick = function() {
//      console.log('hello');
//    }

  function EditandDeletedItem() {
      var ButtonEdit = Container.querySelector('.btn--edit');
    var ButtonDelete = Container.querySelector('.btn--deleted');



    ButtonEdit.onclick = function () {
      console.log('hello');
    }
    ButtonDelete.onclick = function () {

    var DeletedItem = ButtonDelete.parentNode.parentNode.cloneNode(true);
    DeletedItemsTable.insertBefore(DeletedItem, DeletedItemsTable.children[1]);
    ActiveItemsTable.removeChild(ButtonDelete.parentNode.parentNode);
//      DeletedItem.removeChild(lastElementChild.firstElementChild);




    }
  }



//  ButtonAdd.onclick = function() {
//    renderItems(item);
//  }
//  ListNumber.innerHTML = function() {
//    for (var i = 1; i++ );
//    ListNumber.innerHTML = i;
//  }
//  for (var i = 1; i < ListNumber.length; i++) {
//    ListNumber.innerHTML = i;
//  }

//    var ListNumber = Container.querySelectorAll('.counter');
//  ListNumber.forEach(function() {

//  for (var i = 0; i < ListNumber.length; i++) {
//    ListNumber[i].innerHTML = i;
//  }
//  })
function sum () {
var result = 0;
  var ListPrice = Container.querySelectorAll('.list__price');
  for (var i = 0; i < ListPrice.length; i++) {
     var ListPriceValue = ListPrice[i].innerHTML;
  };
  for (var i = 0; i < ListPriceValue.length; i++) {


    result += parseInt(ListPriceValue[i]);
    return result;

  }
//  return result;

}

//  function sendItem() {
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', 'data/hotels.json');
//    xhr.onload = function(event) {
//      var rawData = event.target.response;
//      var loadedHotels = JSON.parse(rawData);
//        hotels = loadedHotels;
//
//    };

//    xhr.send();
//  }

  })();

