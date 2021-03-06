/**
 * Created by Administrator on 2015/9/6.
 */
module.exports = function(grunt){

    var config = {
        "liveReloadPort": 35729,
        "appPort":3000
    };

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['assets/scss/**/*.{scss,css}'],
                tasks: ['compass:debug','copy']
            },
            copy: {
                files: ['assets/images/**/*.{png,jpeg,jpg,gif,svg}'],
                tasks: ['copy']
            },
            jekyll:{
                files: ['_includes/**/*.html','_layouts/**/*.html','_posts/*.md','_assets/**/*.html','./*.{html,md}'],
                tasks: ['exec:build']
            }
        },
        compass: {
            debug:{
                options: {
                    cssDir: 'assets/css',
                    sassDir: 'assets/scss',
                    imagesDir: 'assets/images',
                    relativeAssets: true,
                    httpGeneratedImagesPath: '/images',
                    generatedImagesDir: 'assets/images'
                }
            }
        },
        copy: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets',
                        src: ['**/*'],
                        dest: '_site/assets'
                    }
                ]
            }
        },
        exec: {
            build: {
                cmd: 'jekyll build'
            },
            serve: {
                cmd: 'jekyll serve --watch'
            },
            deploy: {
                cmd: 'rsync --progress -a --delete -e "ssh -q" _site/ myuser@host:mydir/'
            }
        },
        connect: {
            options: {
                port: config.appPort,
                hostname: '0.0.0.0'
            },
            debug: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(
                                {port: config.liveReloadPort }
                            ),
                            require('./server/router.js')('_site')
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:' + config.appPort
            }
        },
    });

    grunt.registerTask('default', [
        'exec:build',
        'connect:debug',
        'open',
        'watch'
    ]);
}