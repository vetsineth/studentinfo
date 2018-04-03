import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { Emails } from '../both/collection';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  const instance=Template.instance();
  loadData(instance);
 // console.log(moment().add(2,'days').calender());
  this.infos=new ReactiveVar();
  this.meteor = new ReactiveVar();
  this.txtname = new ReactiveVar();
  this.txtpassword = new ReactiveVar();
  this.txtgender = new ReactiveVar();
  this.txtid=new ReactiveVar();
});

Template.hello.helpers({
  EmailList() {
    const instanc=Template.instance();
    return instanc.infos.get();
  },
  txtname(){
    const instance=Template.instance();
    return instance.txtname.get();
  },
  txtpassword(){
    const instance=Template.instance();
    return instance. txtpassword.get();
  },
  txtgender(){
    const instance=Template.instance();
    return instance.txtgender.get();
  },
  txtid(){
    const instance=Template.instance();
    return instance.txtgender.get();
  }
});

Template.hello.events({
  'keyup #name'(event, instance) {
    
    instance.txtname.set(event.currentTarget.value);
  },
  'keyup #pword'(event, instance) {
    
    instance.txtpassword.set(event.currentTarget.value);
  },
  'keyup #gender'(event, instance) {
    
    instance.txtgender.set(event.currentTarget.value);
  },
  'click #btn-insert'(evt, inst) {
    const instance=Template.instance();
    let data = {
      name: inst.txtname.get(),
      pword: inst.txtpassword.get(),
      gender: inst.txtgender.get(),
    }
    Emails.insert(data);
    loadData(instance);
    console.log(data);
  },
  'click .btn-remove'(event,instance){
    event.preventDefault();
    let id=this._id;
    Meteor.call('removeinfo',id,(error,result)=>{
      alert("success");
      loadData(instance)
    })
 },
  'click .btn-edit'(event,instance){
    event.preventDefault();
    instance.txtid.set(this._id)
    instance.txtname.set(this.name);
    instance.txtpassword.set(this.pword);
    instance.txtgender.set(this.gender);
    // Meteor.call('updateData',name,(error,result)=>{
    // Emails.loadData(instance);
    // })
  },
  'click .btn-update'(event,instance){
    
    let name=instance.txtname.get();
    let password=instance.txtpassword.get();
    let gender=instance.txtgender.get();
    let id=instance.txtid.get();
    console.log(id);
    let obj ={
      name:name,
      pword:password,
      gender:gender
    }
    Meteor.call('updateData',id,obj,(error,res)=>{
      alert(" success" );
      loadData(instance);
    })
  }
}); 
function loadData(instanc) {
  Meteor.call('getallinfo',(error,result)=>{
    instanc.infos.set(result);
  })
}