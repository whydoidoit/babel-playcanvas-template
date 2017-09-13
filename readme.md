# Introduction

This is a template project for using ES6 via Babel and WebPack to build [PlayCanvas](https://playcanvas.com) projects.

PlayCanvas is a fantastic open source WebGL Engine and online Editor (which you can get access to for free or pay for 
an organisational license).  

PlayCanvas have developed a shared model that means you can edit your 3D scenes as a collaborative experience with
team mates around the office, or around the world - it's great.  They have applied the same to code editing, which 
is fine for some use cases but imposes certain limitations:

* No offline access to source code
* You are stuck with their web editor - which is "ok" but no WebStorm, Sublime or VSCode
* No source control
* Someone else can change your file when you aren't looking and you'll never know who!
* No ES6 features, just pure Javascript
* No NPM ecosystem, meaning you are scrabbling for browserified versions of libraries
or more often doing something again or just not bothering

All of this means that it is hard to choose PlayCanvas for serious development projects without going "Engine Only"
and that loses you many of the advantages of having a fantastic online editor and layout tool.  So now why choose
PlayCanvas when Three.js would give you just as much if not more?

The answer has to be to produce code in a proper offline build environment with all the advantages of Babel, WebPack, 
NPM et al and still be able to use the output in the PlayCanvas online Editor.  As no one had done this, and I needed
it for a number of projects I took on the task myself.  This has lead to a number of NPM repos and a WebPackPlugin that 
automate most of the process.

## Why ES6

If you are asking why you should use ES6 and Babel then I'd say it's for one simple reason: a programming language
should try to get the hell out of your way and let you express what you want.  

When we code Javascript for WebGL we are coding for the browser and nearly everything that touches the outside world 
will be async.  Expressing async in traditional Javascript is messy as hell.  Try writing a for-next loop that loads 
a list of things from the web in sequence using Promises or callbacks and it will become immediately obvious.  With
Babel and ES6 it's just a loop.  Everything else is a christmas tree.  Yes it's possible, but it's easy to have a
hard to spot bug, so you do LESS of it than you would otherwise and refactoring is a scary prospect.  That's not 
right.  That's damaging your creativity to my mind.

```javascript

function requestFromUrl(url, info) { return new Promise(/* code */)}

async function getData() {
    let urls = ["https://blah1.org", "https://blah1.org/blah", "https://blah2.org/blah/blah"];
    let data = "";
    for(let i = 0; i < urls.length; i++) {
        data = await requestFromUrl(urls[i], data);
    }
    return data;
}

```

I know this is a contrived example, but this "kind of thing" happens all of the time in my developments, and they 
are better for me being able to implement them easily. Write that as just promises or callbacks and it will be illegible
to most developers without a lot of study.

ES6/ES7 etc exist to create a better programming language for the web, I say let's use it.

### Not many browsers support ES6 let alone ES7

That's what Babel is for, if the browser doesn't support something, it provides that support for you.  Plus it compiles
your ES6 to ES5.

In addition this template project lets you specify which versions of browsers you are supporting and Babel only does what
it has to.  You could even simply build different versions for different browsers (or ages of browser etc) if you prefer!

## Why NPM

If you need some standard function, algorithm or procedure there's a good chance that there is tested code out there to install.
with one line of shell script.

## Why WebPack

WebPack is going to make building all of this and serving it to your browser an automated process.

# Getting Started

The shortest way to get started is really simple. 

## Prerequisites

You must have a version of Node and NPM installed.

You can get that from [here](https://nodejs.org).

## Installing the template project

Make a directory and change to it

```shell
npm install babel-playcanvas-template
```

Now in `[YOUR_DIRECTORY]/node_modules/babel-playcanvas-template` are all of the files you need.  Either
develop in there or copy that whole directory structure somewhere you want to develop.

The entry point - which is where you will import your own code - is in `src/main.js`

In the template this imports a bunch of PlayCanvas extensions and then a single 
`example.js` script that uses a couple of ES6 features for a demo.

## Writing your own code

Create a file in `src` and script what you like.  Just make sure that it is imported
by `main.js`.  When you start developing things that import each other, you just need
to make sure that something in `main.js` imports something that imports the code you
add!  

If you find that something didn't show up, that's probably why.

## Building, debugging and testing your code

Firstly we need to make a configuration file - there's an example called `config.example.json`.

The config file is in the root of the project (the parent of `src`) and needs
to be called `config.json`.  This will eventually also control the automatic upload
of your code to PlayCanvas, but to start with, just copy the example to `config.json`.

You can build your code using either `webpack` or an automated process with `npm`.

So typing `npm run build` in the root folder of the project (the parent of `src`) 
the template will build a production version of your code into the `build` folder.

**Either** build your code with NPM
```shell
npm run build
```

**Or** build your production code with webpack
```shell
webpack --config webpack.production.config.js
```

The output file will be called `main.build.js`.  To use that in PlayCanvas just drag and drop
it onto the PlayCanvas editor for your project.

Now open your developer tools in the browser with the PlayCanvas Editor open and in 
the Javascript console type

```javascript
config.accessToken
```

Copy the result of this and paste it into the `config.json` file as your bearer token.

Then in the javascript console type

```javascript
config.project.id
```

And put that in the project id part of `config.json`

Finally if you haven't already done it, drag `main.build.js` and drop it in the PlayCanvas assets window.  

When it's imported click on it and in the properties window on the right, take it's ID and put that in 
`config.json` as your assetId.

Now every time you run `npm run build` it will upload the result to PlayCanvas for you. 

### Local serving your development build

There's a better way to do ongoing development though, you only really need to upload your build when
the attributes of something change, you add a new script or you want to publish your build.

This template project has a solution for that too.  You will be able to see all of your 
source code in your developer tools when you use any means of making a `development` build.

#### Loading Screen Method

If you have a loading screen or can make one then you can use either the whole script in
`utility-scripts/loading_screen_scripts_2_0.js` or add the `utility-scripts/exerpt.js` to
the top of your own.  

This will allow you to serve files locally if you add a `?local=http://localhost:8081` to 
your launch url query string **AND** you change the protocol of the launch page to be `http`. 
If you really need `https` then see the section later on how to do that instead.

#### PlayCanvas Script Method

This is less reliable.  Create a script in PlayCanvas Editor.  Copy `utility-scripts/exerpt.js`
into it and set it's loading order to be before `main.build.js`.

See the instruction about the URL in the previous section on how to modify your launch to use
it.

#### Starting the server

Now you can type

`npm start` in the project root. This will, build and upload your code, then start a local server
to serve any changes you make.  When you change your code, your launch window will automatically
update.

If you need to upload again, just stop the server with CTRL+C and type `npm start` again. Then refresh
your launch window.

### Development builds without local serving

Type `webpack --config webpack.development.config.js` to build and (if configured) upload a development
version of your code which will have source mapping to make it possible to see your own code
when you debug.

## Production Build

Just type `npm run build` any time you want a production build.

Production builds are minified and don't have source maps embedded (they are a separate file).

## Using NPM

You can just use NPM like normal.  Basically find the module you need and type

```shell
npm install --save <module-name>
```

You can then import it into the file you need it in by adding an `import` statement at the 
top of your file.

```javascript
import blah from 'blah-module';

...

blah(something); 

```

You may also use `require` syntax if the whole file is written that way.

# Conclusion

Hopefully this will get you started using ES6 and modules with PlayCanvas. Feel free to
ask for @whydoidoit on the PlayCanvas forum if you want to discuss.

Enjoy!



*- Ends -*

----



##### HTTPS serving

You can configure webpack to HTTPS serve instead of HTTP.

Use `npm run https` to start your local development build. Then:

* Either: in a separate window navigate to https://localhost:8081/main.build.js and if you
are warned it isn't safe, just proceed anyway. This will mean that you always see that the
launch page is untrusted and may cause other issues, it's normally fine for me.

* Or: get your browser to trust `node_modules/webpack-dev-server/ssl/server.pem`. This can be
easier said than done.  You can also replace `server.pem` with your own trusted `localhost` 
certificate.  Just you'll have to pack it as a `.pem` file. (On Apple by default it will be a `.p12`, 
Google for how to change it).

**Don't forget to change your launch URL and the local parameter `?local=http://localhost:8081` to HTTPS!!**

Personally I've used [Certificate Tools](https://certificatetools.com) to make certs that work. Make sure you sent the `Subject
Alternative Name(s) DNS` to localhost as well as `Common Names`.  It also provides you with a thing
to run to pack .p12 into a .pem after you've generated your certificate.  It only took me about 5 tries
to work out what I had to do with it! 
