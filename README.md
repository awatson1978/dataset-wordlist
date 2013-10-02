**dataset-wordlist** is a Meteorite package that adds the Fry Wordlist of 1000 most commonly used words.

------------------------
### Installation

Begin by installing the dataset-wordlist package from the command line, like so:

````
mrt add dataset-wordlist
````

Alternatively, if you'd like to bypass Atmosphere, and install directly from GitHub, you could update your application's smart.json file, like so:

````
{
  "meteor": {
    "branch": "master"
  },
  "packages": {
    "dataset-wordlist": {
      "git": "https://github.com/awatson1978/dataset-wordlist.git"
    }
  }
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

//-------------------------------------------------------------
// A.  Generate Wordlist

Template.wordlistIndexTemplate.fryWordList = function(){
    try{
        return WordList.find({
            'Word': { $regex: Session.get('word_search'), $options: 'i' }
        },{limit: 96});
    }catch(error){
        console.log(error);
    }
};


//-------------------------------------------------------------
// B.  Display Word in Edit Pannel When Clicked

Template.wordlistIndexTemplate.events({
    'click .list-group-item':function(event, template){
        Session.set('selected_word', this._id);
        Session.set('current_action','view');
    }
});


//-------------------------------------------------------------
// C.  Filter Results When User Enters Search Term

Template.wordlistIndexTemplate.events({
    'keyup #wordlistSearchInput': function(evt,tmpl){
        try{
            Session.set('word_search', $('#wordlistSearchInput').val());
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    }
});

````


------------------------
### CRUD Forms Data/Document Model

Once those peices are in place, you're ready to implement the rest of the CRUD pattern, by adding a form and buttons for Create, Update, and Delete functions.

````html
<template name="wordlistFormTemplate">
    <div class="padded">
        {{#if word}}
            {{#with word}}
                <div class="panel panel-info">
                    <div class="panel-heading padded">
                        <bold>Word ID:</bold> {{_id}}
                    </div>
                    <div class="word-form">
                        <input id="wordInput" type="text" placeholder="spelling..." value="{{Word}}" {{word_enabled}}></input>
                        <label class="smallgray" for="wordInput">Spelling</label>
                    </div>
                    {{#if isNewWord}}
                        <div class="spacer row"></div>
                        <div class="container">
                            <div class="col col-lg-12">
                                <button id="newWordButton" type="button" class="fullwidth btn btn-info" width="100%">Create New Word!</button>
                            </div>
                        </div>
                    {{/if}}

                    {{#if isDeletingWord}}
                    <div class="spacer row"></div>

                        <div class="alert alert-danger with-top-spacer">
                            <div class="container">
                                <div class="col col-lg-6">
                                    <button id="deleteWordButton" type="button" class="fullwidth btn btn-danger">Delete This Word</button>
                                </div>
                                <div class="col col-lg-6">
                                    <button id="cancelDeleteWordButton" type="button" class="fullwidth btn btn-danger">Cancel</button>
                                </div>
                            </div>
                        </div>
                    {{/if}}
                </div>
            {{/with}}
        {{else}}
            <div class="panel panel-info">
                <div class="panel-heading padded">
                    <bold>Word ID:</bold> ...
                </div>
                <div class="centered dictionary-form">
                    <h2>Select a word to edit.</h2>
                </div>
            </div>
        {{/if}}
    </div>
</template>

````




------------------------
### CRUD Forms Controller

And when that's in place, you're ready for the final step in implementing the pattern, with the following.

````js


//-------------------------------------------------------------
// D.  Edit Form Helper 

Template.wordlistFormTemplate.helpers({
    word: function(){
        try{
            if(Session.get('current_action') == 'new'){
                return {"Word":""};
            }else{
                return WordList.findOne(Session.get('selected_word'));
            }
        }catch(error){
            console.log(error);
        }
    }
});


//-------------------------------------------------------------
// E. Active Input When Clicked ot Tapped

Template.wordlistFormTemplate.events({
    'click #wordInput':function(){
        Session.set('editing_word', true);
        Meteor.flush();
    },
    'touchend #wordInput':function(){
        Session.set('editing_word', true);
        Meteor.flush();
    },
    'mouseout #wordInput':function(){
        Session.set('editing_word', false);
        Meteor.flush();
    }
})



//-------------------------------------------------------------
// F. Submit Input to Mongo (Update)

Template.wordlistFormTemplate.events(
    okCancelEvents('#wordInput',
        {
            ok: function (value) {
                WordList.update(Session.get('selected_word'), {$set: { 'Word': value }});
                Session.set('editing_word', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_word', false);
            }
        })
);


//-------------------------------------------------------------
// G. Determine if Input should be Readonly 

Template.wordlistFormTemplate.word_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_word')){
        return "enabled";
    }else{
        return "readonly";
    }
};



//-------------------------------------------------------------
// H. Determine if Buttons Should be Displayed

Template.wordlistFormTemplate.isNewWord = function(){
    try{
        if(Session.get('current_action') == 'new'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};
Template.wordlistFormTemplate.isDeletingWord = function(){
    try{
        if(Session.get('current_action') == 'delete'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};

//-------------------------------------------------------------
// I. Call Server Side New Word Method (New, Delete)

Template.wordlistFormTemplate.events({
    'click #newWordButton': function(){
        console.log('creating new word...');

        try{

            // TODO:  add validation functions
            if ($('#wordInput').val().length) {

                Meteor.call('createNewWord', {
                    Word: $('#wordInput').val()
                }, function (error, word) {
                    console.log('error: ' + error);
                    console.log('word: ' + word);
                });
            } else {
                Session.set("createError",
                    "Word needs characters, or why bother?");
            }
            evt.target.value = '';
            Meteor.flush();
        }catch(err){
            console.log(err);
        }

        Session.set('current_action','view');
    },
    'click #deleteWordButton': function(){
        WordList.remove(Session.get('selected_word'));
        Session.set('current_action','view');
    },
    'click #cancelDeleteWordButton': function(){
        Session.set('current_action','view');
    }
});

````


------------------------
### Licensing

MIT License. Use as you wish, including for commercial purposes.
See license.mit.txt for full details.

------------------------
### Support
Found this package to be useful?  Consider tipping the package maintainer for their time!  

[![Support via Gittip](https://raw.github.com/gittip/www.gittip.com/master/www/assets/gittip.png)](https://www.gittip.com/awatson1978/)  

