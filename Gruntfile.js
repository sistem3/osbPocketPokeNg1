'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    html2js: {
      options: {
        module: 'osb-pocket-poke-template'
      },
      main: {
        src: ['src/**/*.tpl.html'],
        dest: 'src/osbPocketPoke.directive.tpl.js'
      }
    },
    concat: {
      build: {
        src: ['src/osbPocketPoke.directive.tpl.js', 'src/osbPocketPoke.directive.js'],
        dest: 'dist/osbPocketPoke.js'
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'src/css/osbPocketPoke.css': 'src/scss/osbPocketPoke.scss'
        }
      }
    },
    watch: {
      templates: {
        files: ['src/**/*.html'],
        tasks: ['html2js'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('template', ['html2js']);
  grunt.registerTask('build', ['sass', 'html2js', 'concat']);
};