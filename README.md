**dataset-wordlist** is a Meteorite package that adds the Fry Wordlist of 1000 most commonly used words.

------------------------
### Installation

Begin by installing the dataset-wordlist package from the command line, like so:

````
meteor add awatson1978:dataset-wordlist
````

------------------------
### Default Wordlist Schema  

The user objects are have a fairly simple document schema that looks like the following:
````js
{
  word:   String
}
````
------------------------
### Data/Document Model for Reading Data from Collection

Once done, you'll want to display data from the collection by adding the following templates into your document model.  The class names come from Bootstrap v3.

````html
<template name="wordlistIndexTemplate">
  <div class="padded">
    <div class="panel panel-info">
      <div class="panel-heading">
        <input id="wordlistSearchInput" type="text" placeholder="Filter..."></input>
      </div>
      <ul class="horizontal centered row show-grid">
        {{#each fryWordList}}
        {{> wordlistListItemTemplate }}
        {{/each}}
      </ul>
    </div>
  </div>
</template>
<template name="wordlistListItemTemplate">
  <li class="col col-lg-2 list-group-item">{{ Word }}</li>
</template>

````



------------------------
### Controller for Reading Data from Collection

To dislay data, you'll also need to add the controllers, like so:

````js

Template.wordlistIndexTemplate.helpers({
  fryWordList = function(){
    return WordList.find({
        'Word': { $regex: Session.get('word_search'), $options: 'i' }
    },{limit: 96});
  }
});

````
------------------------
### Licensing

MIT License. Use as you wish, including for commercial purposes.
