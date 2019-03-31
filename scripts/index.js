
//put data into html
const guideList = document.querySelector('.guides');

//set up guides
const setupGuides = (data) => {
  let html = '';

  data.forEach(doc => {
    //get props of doc
    const guide = doc.data();
    //console.log(guide);
    //``template string
    const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${guide.title}</div>
    <div class="collapsible-body white">${guide.content}</div>
     </li>
    `;
    //append li to html
    html += li;
  });

  guideList.innerHTML = html;
}



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});