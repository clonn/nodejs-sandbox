var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
 
var Blog = new Schema({
	username: String,
	article: String,
	createDate: Date
});
 
var Comment = new Schema({
	visitor: String,
	comment: String,
	messageId: Schema.Types.ObjectId,
	createDate: Date
});

mongoose.model( 'Blog', Blog );
mongoose.model( 'Comment', Comment );
mongoose.connect('mongodb://localhost/blog');