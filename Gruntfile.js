module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          'style': 'compressed',
          'sourcemap': false
        },
        files: {
          'main.css': 'scss/main.scss'
        }
      }
    },
    autoprefixer: {
      dist:{
        files:{
          'main.css': 'main.css'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default',['sass','autoprefixer']);
}
