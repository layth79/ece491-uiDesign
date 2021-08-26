function createCalendar(elem, year, month) {
    let currDate = new Date();
    let highlight = String(currDate.getDate()).padStart(2, '0');
    let mon = month; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let table = '<table><h2 class="month" id="month">' + monthNames[mon] + " - "+ d.getFullYear() + '</h2>';
    table += '<table><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr><tr>';
  
    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    let prev = new Date(year, month, 0).getDate();
    let start = prev - d.getDay() + 1;
    for (let i = 0; i < getDay(d); i++) {
      if (getAssignment(calItems, start, mon) !== false){
        table += '<td class="dummy2"><span class="test dummy">' + start + '</span>'+ getAssignment(calItems, start, mon) + '</td>';
      }
      else{
        table += '<td class="dummy2"><span class="test dummy">' + start + '</span></td>';
      }
      start++;
      }
      
    // <td> with actual dates
    while (d.getMonth() == mon) {
      if(d.getDate() == highlight && mon == currDate.getMonth() && year == currDate.getFullYear()){ 
        if (getAssignment(calItems, d.getDate(), d.getMonth()+1)){
          table += '<td class="highlight">'+ '<span class="test highlight">'+ d.getDate() + '</span>' + getAssignment(calItems, d.getDate(), d.getMonth()+1) + "</td>";
        }
        else {
          table += '<td class="highlight"><span class="test highlight">'+ d.getDate() + '</span></td>';
        }
      }
      else{
        if (getAssignment(calItems, d.getDate(), d.getMonth()+1) !== false){
          table += '<td>'+ '<span class="test">'+ d.getDate() + '</span>' + getAssignment(calItems, d.getDate(), d.getMonth()+1) + "</td>";
        }
        else{
          table += '<td><span class="test">'+ d.getDate() + '</span></td>';
        }
      }
      
      if (getDay(d) % 7 == 6) { // sunday, last day of week - newline
        table += '</tr><tr>';
      }
  
      d.setDate(d.getDate() + 1);
    }
  
    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    let after = 1; 
    if (getDay(d) !== 0) {
      for (let i = getDay(d)-1; i < 6; i++) {
        if (getAssignment(calItems, after, mon+2) !== false){
          table += '<td class="dummy2"><span class="test dummy">' + after + '</span>'+ getAssignment(calItems, after, mon+2) + '</td>';
        }
        else{
          table += '<td class="dummy2"><span class="test dummy">' + after + '</span></td>';
        }
        after++; 
      }
    }
  
    // close the table
    table += '</tr></table>';
  
    elem.innerHTML = table;
  }
  
  function getDay(date) { // get day number from 0 (Monday) to 6 (Sunday)
    return date.getDay();
  }

  function getFromLocalStorage3() {
    var reference = localStorage.getItem('items');
    // if reference exists
    if (reference) {
      // converts back to array and store it in items array
      items = JSON.parse(reference);
      return items; 
    }
  }
  
  function getAssignment(calItems, date, month) {
    let tmp = '<span class="classItem">';
    for(let i = 0; i<calItems.length; i++){
      itemDate = calItems[i].date;
      itemDate = itemDate.split('-');
      if(itemDate[1] == month && itemDate[2] == date &&itemDate[0]==y){  //check again for priority 
        let name = calItems[i].name;
        let prior = calItems[i].color;
        name = name.split(" ");
        if(name[0].length > 7)
        {
          tmp += '<i id="'+ prior + '" class="fa fa-tag" aria-hidden="true"></i> ' + name[0].slice(0, 7) + '.<br>'
        }
        else
        {
          tmp += '<i id="'+ prior + '" class="fa fa-tag" aria-hidden="true"></i> ' + name[0] + '<br>'
        }
      }
    }
    if(tmp!=='<span class="classItem">'){
      return tmp += '</span>';
    }
    return false;
  }

  const formInp = document.querySelector('.form');
  
  let current = true; 
  let d = new Date();
  let m = d.getMonth();
  let y = d.getFullYear();
  let calItems = getFromLocalStorage3();

  formInp.addEventListener('submit', function(event){
    Object.reload(forcedReload);
  });

  
  
  createCalendar(calendar, y, m);
  document.addEventListener('click', function(event) {
    if(event.target.classList.contains('left')){
      if(m===0){
        m=11;
        y--;
      }
      else{
        m--;
      }
      createCalendar(calendar, y, m);
    }
    else if(event.target.classList.contains('right')){
      if(m===11){
        m=0;
        y++; 
      }
      else{
        m++;
      }
      createCalendar(calendar,y,m);
    }
  });