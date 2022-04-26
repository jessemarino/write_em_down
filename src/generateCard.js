// Returns string of li elements for each item in the given list object.
const renderCard = (list) => {
    return list.items.map(
       (item) => `<li class="list-group-item">${item.toString()}</li>`
    );
  };
  
  const generateCard = (list) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="./style.css" rel="cssStyleSheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
        <title>Write em Down</title>
    </head>
    <header class="team" style="background-color: rgb(161, 7, 7); color: rgb(19, 19, 151);">
        <h1 style="margin-left: 50%;">My team</h1>
    </header>
    <body>
        
        <div class="d-flex min-vh-100 min-vw-100 justify-content-center align-items-center; card">
            <div class="card-header">
                <h1>name</h1>
                <h2>title</h2>
            </div>
            <ul class="list-group list-group-flush">
                ${renderCard}
            </ul>
        </div>
        
    </body>
    </html>`;
  };

  module.exports = generateCard;
  