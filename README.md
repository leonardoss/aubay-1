# SantoPixel Boilerplate
Boilerplate used by SantoPixel to create projects. Frontend (HTML, CSS) and WordPress Theme.

### Cool Features ###
- Runs in a Node server with Live CSS Reload and Browser Syncing (BrowserSync)
- Gulp taks to generate bundles and WordPress structure theme
- PHP enabled (gulp-connect-php) to crete dynamic templates
- SASS (Uglify, Minify and sourcemaps)
- ImageMin to compress images

### Directory Strcture ###
```
/site
    /fonts (custom fonts like icomoon)
    /images (add your images, after build they will be compressed)
    /includes (add your PHP includes)
    /maps (JS and CSS maps)
    /php (PHP templates)
    /scripts (all your .JS in /js will be concatened in site.js)
        /scripts/js (put your JS libs here and use santopixel-boilerplate.js to add your custom JS)
    /styles (all your .SCSS in /sass will be concatened in styles.css)
        /styles/init.scss (organize your .SCSS files as you want :) )
/wordpress (WordPress in 4.9.8)
    /wp-content/themes
        Use this folder to create your theme from scratch. 
```
### How to use ###
#### How to run ####
Install node dependencies (node v8.11.4)
```
npm install
```

Run frontend (with gulp installed globally)
```
gulp
```

Build your project
```
gulp deploy
```
It will generate a /dist folder and in /wordpress/wp-content/themes/santopixel-boilerplate-wp-theme with your bundle files (CSS and JS) and images.

#### Tips ####
#### Run WP locally ####
You can use a MAMP and point directly to the theme folder