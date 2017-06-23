/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
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
                        'Scripts/js/**/*.js'
                    ],
                    dest: 'wwwroot/js/',
                    filter: 'isFile'
                }]
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