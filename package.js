Package.describe({
  summary: "Meteorite package that adds the Fry Wordlist of 1000 most commonly used words.",

    // update this value before you run 'meteor publish'
    version: "1.0.0",

    // if this value isn't set, meteor will default to the directory name
    name: "awatson1978:dataset-wordlist",

    // and add this value if you want people to access your code from Atmosphere
    git: "http://github.com/awatson1978/dataset-wordlist.git"
});

Package.on_use(function (api) {
    api.use('standard-app-packages@1.0.4');
    api.add_files('initialize.wordlist.js', ["client","server"]);
});
