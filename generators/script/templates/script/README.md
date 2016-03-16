# ios-build-scripts

[![CI Status](http://img.shields.io/travis/cybertk/ios-build-scripts/master.svg?style=flat)](https://travis-ci.org/cybertk/ios-build-scripts)

This project is a collection of scripts created with two goals:

1. To standardize how iOS projects are bootstrapped after cloning
1. To easily build iOS projects on continuous integration servers

## Getting Started

### Commit in repo

To add the scripts to your project, read the contents of this repository into a script folder:

    bash <(curl -s https://cybertk.github.io/ios-build-scripts/bash)

Which inactually executes following steps:

    git remote add ios-build-scripts https://github.com/cybertk/ios-build-scripts.git
    git fetch ios-build-scripts
    git read-tree --prefix=script/ -u ios-build-scripts/master

Then commit the changes, to incorporate the scripts into your own repository's history. You can also freely tweak the scripts for your specific project's needs.

To merge in upstream changes later:

    make -C script

or

    git fetch -p ios-build-scripts
    git merge --ff --squash -Xsubtree=script ios-build-scripts/master

### git submodules

    git submodule add https://github.com/cybertk/ios-build-scripts.git script

## Provisions and Certificates

**update_keychain** is used to manage Provisions and Certificates, put your certificates and `script/certificates/` dir and put provisions under `script/provisions/`

## Run Commands in cibuild context

You can run any command inside `cibuild` context

    ./script/cibuild echo $GIT_COMMIT $GIT_BRANCH $BUILD

## Source cibuild

You can also source `cibuild` to get env/utility in current context with

    . script/cibuild
