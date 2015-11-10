# Grunt

## What is it?
- The javascript task runners

## Getting started

### installing the CLI

```
sudo npm install -g grunt-cli
```

### init project

```
npm init
```

### installing local grunt

```
npm install -S grunt
```

### create grunt default script file

```
touch Gruntfile.js
```

### create modules export

```
modules.exports = function(grunt){

}
```

### Creating tasks

[document](http://gruntjs.com/creating-tasks)

```
module.exports = function(grunt) {

  grunt.registerTask('hello', function() {
    console.log('Hello');
  });

  grunt.registerTask('morning', function() {
    console.log('Good morning!');
  });

  grunt.registerTask('default', ['hello', 'morning']);
};
```

```
grunt hello
```

```
grunt
```

### install other plugin

```
npm install grunt-contrib-concat --save-dev
```

### How to use other plugin

```
grunt.loadNpmTasks('grunt-contrib-concat');
```

### setting grunt.initConfig

### run grunt plugin

```
grunt concat
```

### Try to add other plugin, e.g. grunt watch.

## Resource

### Website
- [Grunt](http://gruntjs.com/)
- [Getting started](http://gruntjs.com/getting-started)

### Video
- [GRUNT TUTORIAL - Grunt makes your web development better](https://www.youtube.com/watch?v=TMKj0BxzVgw)
