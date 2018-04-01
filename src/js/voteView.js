VoteView = {

  renderOngoingVotes: function(data) {
    var accnts = "";
    for(var x=0; x<data.length; x++) {
      var blockUnblock = "";
      if(data[x].forBlock) {
        var blockUnblock = "<label id=\"block"+x+"\">Vote For Blocking</label><br/>";
      }
      else {
        var blockUnblock = "<label id=\"unBlock"+x+"\">Vote For UnBlocking</label><br/>";
      }
      var locAccnt = "<label id=\"accnt"+x+"\" value=\""+data[x].account+"\">"+data[x].account+"</label><br/>";
      var locReason = "<label id=\"reson"+x+"\">"+data[x].reason+"</label><br/>";
      var yesCount = "<label>Yes Count: "+data[x].yesCount+"</label><br/>";
      var noCount = "<label>No Count: "+data[x].noCount+"</label><br/>";
      var yesBtn = "<button onclick=\"VoteController.voteYes("+x+");\">Vote Yes</button>";
      var noBtn = "<button onclick=\"VoteController.voteNo("+x+");\">Vote No</button><br/><br/>";

      accnts += blockUnblock + locAccnt + locReason + yesCount + noCount + yesBtn + noBtn;
    }

    $('#votesCurrentlyOn').html(accnts);
  },

  renderCreateVotes: function(data) {
    var accnts = '';
    for(var x=0; x<data.length; x++) {
      var locAccnt = "<label id=\"accnt"+x+"\" value=\""+data[x]+"\">"+data[x]+"</label><br/>";
      var locReason = "<label>Reason</label><input type=\"text\" id=\"reason"+x+"\"></input><br/>";
      var locBlkUnBlk = "<label>Block=1, else whatever</label><input type=\"number\" id=\"blockUnblock"+x+"\"></input><br/>";
      var locBtn = "<button onclick=\"VoteController.newVoteSubmit("+x+");\">Submit</button><br/><br/>"
      accnts += locAccnt + locReason + locBlkUnBlk + locBtn;
    }

    $('#createVotingFor').html(accnts);
  }
};

function myFunction() {
 
 var oTable = document.getElementById('myTable');

    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 0; i < rowLength; i++){

     
       if (document.getElementById("inlineFormInputGroup1").value===document.getElementById("myTable").rows[i].cells.item(0).innerHTML){
       	if (document.getElementById("exampleRadios1").checked){
       	var x = document.getElementById("myTable").rows[i].cells.item(1).innerHTML;
        x++;
         document.getElementById("myTable").rows[i].cells.item(1).innerHTML=x;
       }
       	if (document.getElementById("exampleRadios2").checked){
       	var y= document.getElementById("myTable").rows[i].cells.item(1).innerHTML;
        y--;
        document.getElementById("myTable").rows[i].cells.item(1).innerHTML=y;
       }
       	
       }
    }
}
