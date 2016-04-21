$(document).ready(function(){

  var yetload = false;
  var yetupdate = false;
  var update = {};

  var printMessages = function(msg, id){
    for(i in msg){
      var head = $( "<h3><div class='heads'><img class='avatar' src='"+ msg[i].avatar+"' /> Autor: "+msg[i].author +" Date: "+msg[i].date +"<br>Asunto: "+msg[i].title  +"</div></h3>" );
      var body = $( "<div><p>"+msg[i].content+"</p></div>" );
      $(id).prepend(body);
      $(id).prepend(head);
    }
    $(id).accordion({collapsible: true, active: false});

  };

  var json = function(f, id){
    $.getJSON(f).done(function(data) {
      if(id != null){
  		    printMessages(data.Messages, id);
      }else{
        update = data.Messages;
      }
  	}).fail(function(){
  		alert("No se han podido cargar los mensajes");
  	});
  };

  var changeVal = function(n){
    val = "UPDATE";
    if(n != null){
      val = val + " " + n;
    }
    $("#update").val(val);
  };

  var valUpdate = function(){
    json("json/update.json", null);
    var nm = 0;
    for(t in update){
      nm = nm + 1;
      console.log(update[i].content);
    }
    console.log(nm);
    changeVal(nm);
  };

  $("#mymsgs").click(function(){
    if(!yetload){
      json("json/myline.json","#accmm");
      yetload = true;
    }
  });
  $("#update").click(function(){
    if(!yetupdate){
      yetupdate = true;
      $("#acctl").accordion( "destroy" );
      printMessages(update, "#acctl");
      changeVal(null);
    }
  });

  $( "#tabs" ).tabs();
  valUpdate();
  json("json/timeline.json","#acctl");


});
