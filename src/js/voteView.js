VoteView = {

  renderOngoingVotes: function(data) {
    var tableHead =  "<table class=table><thead class=\"thead-dark\">";
    var activeColor = "class=\"table-active\"";
    //var topBtn = "<th><a href=\"http://localhost:3000/Voting.html\"><button>Back to top</button></a></th></tr></thead>";
    var accnts = "";
    for(var x=0; x<data.length; x++) {
        if(!data[x].complete) {
          var blockUnblock = "";
          if(data[x].forBlock) {
            var blockUnblock = "<tr><th colspan=\"2\"><label id=\"block"+x+"\">Vote For Blocking</label></th>";
          }
          else {
            var blockUnblock = "<tr><th colspan=\"2\"><label id=\"unBlock"+x+"\">Vote For UnBlocking</label></th>";
          }

          blockUnblock += "</tr></thead>";

          var locAccnt = "<tr "+activeColor+"><td>Account</td><td><label id=\"accnt"+x+"\" value=\""+data[x].account+"\">"+data[x].account+"</label></td></tr>";
          var locReason = "<tr "+activeColor+"><td>Reason</td><td><label id=\"reson"+x+"\">"+data[x].reason+"</label></td></tr>";
          var yesCount = "<tr "+activeColor+"><td>Yes Count</td><td><label>"+data[x].yesCount+"</label></td></tr>";
          var noCount = "<tr "+activeColor+"><td>No Count</td><td><label>"+data[x].noCount+"</label></td></tr>";
          var yesBtn = "<tr "+activeColor+"><td><button onclick=\"VoteController.voteYes("+x+");\">Vote Yes</button></td>";
          var noBtn = "<td><button onclick=\"VoteController.voteNo("+x+");\">Vote No</button></td></tr>";

          accnts += tableHead + blockUnblock + locAccnt + locReason + yesCount + noCount + yesBtn + noBtn + "</table><br/>";
        }
    }

    accnts += "<a href=\"http://localhost:3000/Voting.html\"><button>Back to top</button></a>"

    $('#votesCurrentlyOn').html(accnts);
  },

  renderCreateVotes: function(data) {
    var accnts = '';

    for(var x=0; x<data.length; x++) {
    var locReason = "";
    var locBlkUnBlk = "";
    var locBtn = "";
    var notes = "";
    var blocked = "";
    var reasons = "Why you want to block??";
    var tableColor = "class=\"table-success\"";
    var activeColor = "class=\"table-active\"";
    var tableHeaderClick = "data-toggle=\"collapse\" data-target=\"#accordion%\" class=\"clickable\"";
    var tableDataCollapse = "id=\"accordion%\" class=\"collapse\"";
    tableHeaderClick = tableHeaderClick.replace("%", x);
    tableDataCollapse = tableDataCollapse.replace("%", x);

    //for now no effect
    tableHeaderClick = "";
    tableDataCollapse = "";

    if(VoteView.isBlocked(data[x].addr)) {
        tableColor = "class=\"table-danger\"";
    }
    if(VoteView.isVotingOn(data[x])) {
        tableColor = "class=\"table-warning\"";
    }

    accnts += "<table class=table table-hover>";
    if(VoteView.isBlocked(data[x].addr)) {
        blocked += "<tr "+activeColor+" ><td><label "+tableDataCollapse+">Status</label ></td><td><label "+tableDataCollapse+">BLOCKED</label></td></tr>"
        reasons = "Why you want to un-block??";
    }
      var locAccnt = "<thead>";
      locAccnt += "<tr "+tableColor+" "+tableHeaderClick+"><th scope=\"col\"><label >Account</label></th><th scope=\"col\"><label id=\"accnt"+x+"\" value=\""+data[x].addr+"\">"+data[x].addr+"</label></th></tr>";
      locAccnt += "</thead><tbody>";

      if(!VoteView.isVotingOn(data[x])) {
          locReason = "<tr "+activeColor+"><td><label "+tableDataCollapse+">Reason</label></td><td><div "+tableDataCollapse+"><input type=\"text\" size=\"50\" placeholder=\""+reasons+"\" id=\"reason"+x+"\"></input></div></td></tr>";

           var blkUnBlkVal = 1;
           var btnLabel = "Trigger Block Ballot";
          if(VoteView.isBlocked(data[x].addr)) {
            blkUnBlkVal = 2;
            btnLabel = "Trigger Un-Block Ballot";
          }

          locBlkUnBlk = "<tr "+activeColor+" style=\"display:none;\"><td><input type=\"hidden\" id=\"blockUnblock"+x+"\" value=\""+blkUnBlkVal+"\"></input></td></tr>";
          locBtn = "<tr "+activeColor+"><td><label "+tableDataCollapse+">Action</label></td><td><button "+tableDataCollapse+" type=\"button\" class=\"btn btn-primary mb-2\" onclick=\"VoteController.newVoteSubmit("+x+");\">"+btnLabel+"</button></td></tr>"
      }
      else {
        if(data[x].forBlock) {
            notes = "<tr "+activeColor+"><td><label "+tableDataCollapse+">Status</label></td><td><label "+tableDataCollapse+">Voting on for blocking account</label></td></tr>"
        }
        else {
            notes = "<tr "+activeColor+"><td><label "+tableDataCollapse+">Status</label></td><td><label "+tableDataCollapse+">Voting on for un blocking account</label></td></tr>"
        }
        notes += "<tr "+activeColor+"><td>Action</td><td><a href=\"http://localhost:3000/Voting.html#votesCurrentlyOn\"><button type=\"button\" class=\"btn btn-primary mb-2\">Go to Ballot</button></a></td></tr>";
      }

      accnts += locAccnt + blocked + locReason + locBlkUnBlk + locBtn + notes + "</tbody></table><br/>";
    }

    $('#createVotingFor').html(accnts);
    VoteView.myFunction();
  },

  isBlocked: function(addr) {
    for(var x=0; x<VoteController.blockedList.length; x++) {
        if(addr === VoteController.blockedList[x]) {
            return true;
        }
    }
    return false;
  },

  isVotingOn: function(accnt) {
    return typeof(accnt.votingOn) != 'undefined' && accnt.votingOn;
  },

  myFunction: function() {
      var oTable = document.getElementById('myTable');

          //gets rows of table
          var rowLength = oTable.rows.length;

          //loops through rows
          for (i = 1; i < rowLength; i++){



              var x = document.getElementById("myTable").rows[i].cells.item(0).innerHTML;
              x=account[i-1];
              document.getElementById("myTable").rows[i].cells.item(0).innerHTML=x;


              var y= document.getElementById("myTable").rows[i].cells.item(0).innerHTML;
              y=account[i-1];
              document.getElementById("myTable").rows[i].cells.item(0).innerHTML=y;


            }
          },
};

