/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({
        clean: [
            'Scripts/app/*',
            'Scripts/js/*'
        ],
        ts: {
            base: {
                src: [
                    'Scripts/app/main.ts',
                    'Scripts/app/**/*.ts'
                ],
                outDir: 'wwwroot/ app',
                tsconfig: './tsconfig.json'
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'wwwroot/ app',
                    src: ['**/*.js'],
                    dest: 'wwwroot/ app'
                }]
            },
            options: {
                sourceMap: true
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        'Scripts/js/**/*.js',
                        'node_modules/core-js/client/shim.min.js',
                        'node_modules/zone.js/dist/zone.js',
                        'node_modules/reflect-metadata/Reflect.js',
                        'node_modules/systemjs/dist/system.src.js',
                        'node_modules/typescript/lib/typescript.js'
                    ],
                    dest: 'wwwroot/js/',
                    filter: 'isFile'
                },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/@angular/**'
                        ],
                        dest: 'wwwroot/js/@angular/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/rxjs/**'
                        ],
                        dest: 'wwwroot/js/rxjs/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: [
                    'Scripts/**/*.ts',
                    'Scripts/**/*.js',
                ],
                tasks: ['clean', 'ts', 'uglify', 'copy']
            }
        }
    });
    grunt.registerTask('cleanup', ['clean']);
    // Define the default task so it will launch all other tasks
    grunt.registerTask('default', ['clean', 'ts', 'uglify', 'copy',
        'watch']);
};