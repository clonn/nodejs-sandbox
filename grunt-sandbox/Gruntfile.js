module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/1.js', 'src/2.js'],
        dest: 'dist/built.js',
      },
    },
  });

  grunt.registerTask('hello', function() {
    console.log('Hello');
  });

  grunt.registerTask('morning', function() {
    console.log('Good morning!');
  });

  grunt.registerTask('default', ['hello', 'morning']);
  grunt.loadNpmTasks('grunt-contrib-concat');
};
