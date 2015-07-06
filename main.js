//#checks & vars

if(!Notification){
  alert('Please use a modern version of Chrome, Firefox, Opera or Firefox.');
  //return;
}
$('head').append('<audio id="WATERDRIP" src="http://vav17.com/wp-content/uploads/WaterDrip.mp3" />');
var scriptToggle = {
  afkAuto: true,
  afkState: false,
  afkMention: false,
  afkMentionName: undefined,
  afkMentionList: [],
  autoWoot: false
};

//#API

API.on(API.ADVANCE,onAdvance);
function onAdvance(){
  if(scriptToggle.autoWoot===true){
    setTimeout(function(){$('#woot').click();},1500);
  }
}
API.on(API.CHAT,onChat);
function onChat(data){
  if(scriptToggle.afkState===true && $("#chat-input-field").is(":focus") && scriptToggle.afkAuto===true){
    scriptToggle.afkState=false;
    API.chatLog("You are no longer AFK.");
  } else if(data.message.indexOf('@'+API.getUser().username)!==-1){
    if(scriptToggle.afkState!==true && !document.hasFocus() || scriptToggle.afkState!==true && !window.hasFocus()){
    //for(i=0;i<=data.message.split('@').length;i++){
      //if(data.message.slice(data.message.split('@')[i-1].length+1,(data.message.split('@')[i-1].length+1)+(API.getUser().username.length))){
        $('WATERDRIP')[0].play();
        var notif = new Notification(data.un, { icon: 'http://choualbox.com/Img/137168014574.png', body: "mentionned you!" });
        notif.onclick = function(){window.focus();notif.close();};
        setTimeout(function(){notif.close();},3000);
      //}
    //}
    } else if(scriptToggle.afkState===true){
      API.sendChat("@"+data.un+", I am currently AFK. If you wish to be mentionned when I'm not AFK anymore, say yes.");
      scriptToggle.afkMention=true;
      scriptToggle.afkMentionName=data.un;
    }
  } else if(scriptToggle.afkState===true && scriptToggle.afkMention===true && data.message.slice(0,3)==='yes' && data.un===scriptToggle.afkMentionName){
    scriptToggle.afkMentionList.push(scriptToggle.afkMentionName);
    API.sendChat("@"+data.un+" will be mentionned when user is not afk.");
  }
}
API.on(API.CHAT_COMMAND,onChatCommand);
function onChatCommand(data){
  switch(data){
    case'/afk':
      if(scriptToggle.afkState!==true){
        API.chatLog("You are now AFK.");
        setTimeout(function(){scriptToggle.afkState=true;},1000);
      } else {
        scriptToggle.afkState=false;
        API.chatLog("You are no longer AFK.");
      }
      break;
    case'/autoafk':
      if(scriptToggle.afkAuto===true){
        API.chatLog("You will not be set to AFK automatically upon inactivity.");
        scriptToggle.afkAuto=false;
      } else {
        API.chatLog("You will be set to AFK automatically upon inactivity.");
        scriptToggle.afkAuto=true;
      }
      break;
    case'/autowoot':
      if(scriptToggle.autoWoot===true){
        API.chatLog("Autowoot turned off.");
        scriptToggle.autoWoot=false;
      } else {
        API.chatLog("Autowoot turned on.");
        scriptToggle.autoWoot=true;
      }
      break;
  }
}
