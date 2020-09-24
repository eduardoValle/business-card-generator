'use strict';

const {dest, series, src, task, watch} = require('gulp');
const npmDist = require('gulp-npm-dist');
const install = require("gulp-install");
const rename = require('gulp-rename');

function installDependencies() {
  return src(['./package.json'])
    .pipe(install());
}

function moveDependencies() {
  return src(npmDist(), {base: './node_modules/'})
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
    }))
    .pipe(dest('./app/lib'));
}

exports.default = series(installDependencies, moveDependencies);
