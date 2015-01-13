module.exports = {
  jshint: {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish'),
    },
    all: [
      'Gruntfile.js',
      '<%= yeoman.app %>/scripts/{,*/}*.js',
      '!<%= yeoman.app %>/scripts/vendor/*',
      '<%= yeoman.ui %>/*.js',
      'test/spec/{,*/}*.js'
    ]
  }
}
