var arr = [];

var obj = {};

var myArr = [‘one’, ’two’, ’three’]

var myObj = {
     ‘name’ : ‘Alin’,
     ‘nickname’ : ‘alincode'
}



var book={ 
  title:"learn geb", 
  authors:[
    "Alin", "Kyle" 
  ]
};

var jsonBook = JSON.stringify(book);
console.log('jsonBook : ' + jsonBook);

var objectBook = JSON.parse(jsonBook);
console.log('objectBook : ' + objectBook);

var title = objectBook.title;
console.log('title :' + title);
 
