// Generated on 2014-05-21 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var fs = require('fs');

  // load plugins
  grunt.loadNpmTasks('grunt-json-angular-translate');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-concat-json');

  var langPath    = 'app/locale/';
  var defaultLang = grunt.option('lang') || 'en';
  var langs = fs.readdirSync(langPath)
  .reduce(function (langs, file) {
    var stat = fs.statSync(langPath + file);
    if (stat.isDirectory()) {
      langs.push(file);
    }
    return langs;
  }, []);


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Translations
    'concat-json': (function () {
        return langs.reduce(function (tasks, lang) {
          tasks[lang] = {
            cwd: '.tmp/locale/' + lang,
            src: '*.json',
            dest: '.tmp/locale/' + lang + '.json'
          };
          return tasks;
        }, {});
    }()),

    jsonAngularTranslate: {
      createJs: {
        options: {
          moduleName: 'wcagReporter',
        },
        files: [{
          expand: true,
          cwd: '.tmp/locale',
          src: '*.json',
          dest: '.tmp/scripts/locale',
          ext: '.js'
        }]
      }
    },

    html2js: {
      options: {
        module: 'wert-templates',
        quoteChar: '\'',
        singleModule: true,
        indentString: '',
        base: '<%= yeoman.dist %>'
      },
      files: {
        src: '<%= yeoman.dist %>/views/**/*.html',
        dest: '<%= yeoman.dist %>/scripts/templates.js'
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      jsonAngularTranslate: {
        files: ['app/local/**/*.json'],
        tasks: ['translationSetup']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },

      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      distView: '<%= yeoman.dist %>/views',
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/',
        exclude: [
          'bootstrap-sass-official',
          'angular-scenario',
          'angular-mocks'
        ]
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: '<%= yeoman.app %>/bower_components/'
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/bootstrap',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/bootstrap',
        relativeAssets: true,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: false
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/*.js',
            '<%= yeoman.dist %>/styles/main.css',
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        // root: '<%= yeoman.app %>'
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
        removeCommentsFromCDATA: true,
        removeOptionalTags: true,
        removeAttributeQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      },
      distView: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ngmin tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection. It doesn't work on
    // things like resolve or inject so those have to be done manually.
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      defaultLang: {
        src:  '.tmp/scripts/locale/' + defaultLang + '.js',
        dest: '.tmp/scripts/locale/default.js'
      },
      localeCapitalized: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/locale/',
          dest: '.tmp/locale/',
          src: ['**/*.json'],
          rename: function(dest, src) {
            return dest + (src.toUpperCase().substr(0, src.length-4)) + 'json';
          }
        }]
      },
      // We'll make the bootstrap fonts directly available
      font: {
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>/bower_components/bootstrap-sass-official/assets/fonts/bootstrap',
          dest: '<%= yeoman.app %>/styles/bootstrap',
          src: ['glyphicons-halflings-regular.*']
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/**/*.html',
            'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            'glyphicons-halflings-regular.*'
          ]
        }, {
          expand: true,
          flatten: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/styles/bootstrap',
          src: ['styles/bootstrap/*.*']
        }, {
          expand: true,
          cwd: '.tmp/scripts/locale/',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts/locale/'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/wcag20spec/js/',
          src: '*.js',
          dest: '<%= yeoman.dist %>/wcag20spec/js/'
        }, {
          // images
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      options: {
        //sourceMap: true,
      },
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/scripts/scripts.js': ['<%= yeoman.dist %>/scripts/scripts.js'],
      //     '<%= yeoman.dist %>/scripts/templates.js': ['<%= yeoman.dist %>/scripts/templates.js'],
      //     '<%= yeoman.dist %>/scripts/vendor.js': ['<%= yeoman.dist %>/scripts/vendor.js']
      //   }
      // }
    },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'wiredep',
      'copy:font',
      'concurrent:server',
      'autoprefixer',
      'translationSetup',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('translationSetup', [
    'copy:localeCapitalized',
    'concat-json',
    'jsonAngularTranslate',
    'copy:defaultLang',
  ]);

  grunt.registerTask('test', [
    'translationSetup',
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'copy:font',
    'translationSetup',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'htmlmin:distView',
    'html2js',
    'uglify',
    'rev',
    'usemin',
    'clean:distView',
    'htmlmin:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
