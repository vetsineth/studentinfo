import { Meteor } from 'meteor/meteor';
import { Emails } from '../both/collection';


Meteor.startup(() => {
  Meteor.methods({
    'insertData'(insertObj){
      return Emails.insert(insertObj);
    },
    'getallinfo'(){
      return Emails.find().fetch();
    },
    'removeinfo'(id){
       return Emails.remove({_id:id});
    },
    'updateData'(id,objupdate){
      return Emails.update({_id:id},{$set:objupdate});
    }
  })
});
