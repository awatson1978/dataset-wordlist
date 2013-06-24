Package.describe({
  summary: "Meteorite package that adds the Fry Wordlist of 1000 most commonly used words."
});

Package.on_use(function (api) {
    api.add_files('initialize.wordlist.js', ["client","server"]);
});
