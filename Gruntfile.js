module.exports = function(grunt) {
  require(load-grunt-tasks)(grunt);
  grunt.initConfig({
    watch: {
      scripts: {
        files: [],
        tasks: []
      }
    }
  });
};
