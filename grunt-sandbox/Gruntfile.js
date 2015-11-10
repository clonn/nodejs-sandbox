module.exports = function(grunt) {

  grunt.registerTask('hello', function() {
    console.log('Hello');
  });

  grunt.registerTask('morning', function() {
    console.log('Good morning!');
  });

  grunt.registerTask('default', ['hello', 'morning']);
};
