**dataset-wordlist** is a Meteorite package that adds the Fry Wordlist of 1000 most commonly used words.

------------------------
### Installation

First, install the dataset-wordlist package from the command line, like so:

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
### Data/Document Model

Second, you'll want to add some templates into your document model:

````html
<!--
<template name="usersListTemplate">
    <input id="customerSearchInput" type="text" placeholder="Filter..."></input>
    {{#each userList}}
    {{> userListItemTemplate }}
    {{/each}}
</template>

<template name="userListItemTemplate">
    <li class="list-group-item">{{FirstName}} {{LastName}}</div></li>
</template>
-->

````



------------------------
### Controller

Third, populate the template with data

````js

//Template.usersListTemplate.userList = function(){
//    return CustomerAccounts.find({
//        $or: [
//            {'FirstName': { $regex: Session.get('user_search_term'), $options: 'i' }},
//            {'LastName':  { $regex: Session.get('user_search_term'), $options: 'i' }}
//        ]
//    },{limit: 20});
//};
//Template.userListItemTemplate.events({
//    'click .list-group-item':function(event, template){
//        Session.set('selected_user', this._id);
//    },
//    'keyup #customerSearchInput': function(evt,tmpl){
//        try{
//            Session.set('user_search_term', $('#customerSearchInput').val());
//            Meteor.flush();
//        }catch(err){
//            console.log(err);
//        }
//    }
//});

````


------------------------
### Licensing

MIT License. Use as you wish, including for commercial purposes.
See license.mit.txt for full details.
