var obj = {
  nickName: 'Alin',
  lastName: 'Liou'
}

console.log("print obj: %j", obj);
console.log("print obj:", obj);

var objJson = JSON.stringify({ uno: 1, dos: 2 }, null, '\t');
console.log("print objJson: %j", objJson);
 console.log("print objJson:", objJson);
