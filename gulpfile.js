'use strict';

const {dest, series, src, task, watch} = require('gulp');
const npmDist = require('gulp-npm-dist');
const rename = require('gulp-rename');

function moveDependencies() {
    return src(npmDist(), {base: './node_modules/'})
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(dest('./app/lib'));
}

exports.default = series(moveDependencies);