module.exports = function(grunt) {
  const amdSrcPath = 'amd/src';
  const amdEs5Path = 'amd/es5';
  const amdBuildPath = 'amd/build';


  const filesToBuild = ['util.js', 'validateRegistration.js'];

  const babelConfigs = {};
  filesToBuild.forEach(file => {
    const name = file.replace(/\.js$/, '');
    babelConfigs[name] = {
      files: [{
        expand: true,
        cwd: amdSrcPath,
        src: [file],
        dest: amdEs5Path,
        ext: '.js'
      }]
    };
  });


  const requirejsConfigs = {};
  filesToBuild.forEach(file => {
    const name = file.replace(/\.js$/, '');
    requirejsConfigs[name] = {
      options: {
        baseUrl: amdEs5Path,
        name: name,
        out: `${amdBuildPath}/${name}.min.js`,
        optimize: 'uglify2',
        paths: {
          jquery: 'empty:'
        }
      }
    };
  });

  grunt.initConfig({
    babel: babelConfigs,
    requirejs: requirejsConfigs
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('babelBuild', Object.keys(babelConfigs).map(key => `babel:${key}`));
  grunt.registerTask('requirejsBuild', Object.keys(requirejsConfigs).map(key => `requirejs:${key}`));
  grunt.registerTask('amd', ['babelBuild', 'requirejsBuild']);
};
