import './App.css';
import React from 'react';

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState('');
  const [color, setColor] = React.useState('grey');

  React.useEffect( () =>{
    async function fetchData(){
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuotes(data);
      let randomIndex = Math.floor( Math.random() * data.length);
      setRandomQuote( data[randomIndex] );

    }
    fetchData();
  }, [])
  console.log(randomQuote);
  function newQuote(){
    const colorCode=[
      "#FF7F50",
      "#CCCCFF",
      "#6495ED",
      "#9B59B6",
      "#7F8C8D",
      "#283747",
      "#800000"
    ];
    let cindex=Math.floor(Math.random() * color.length);
    setColor(colorCode[cindex]);
    let randomIndex = Math.floor( Math.random() * quotes.length);
    setRandomQuote( quotes[randomIndex] );
  }
  return (
    <div className="container-fluid p-5" id='wrapper' style={{backgroundColor: color}}>
    
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card " id='quote-box' style={{maxWidth:"600px",minWidth:"500px", color:"white"}}>
        <div className="card-body p-5">
     
         { randomQuote ? (
          <>
          <div className="card-title p-3 h2 text-center" id='text' style={{color: color}}>&quot;{randomQuote.text}&quot;</div>
          <div className="card-subtitle text-end pb-3" id='author' style={{color: color}}>&ndash; 
            {randomQuote.author || "unknown"}</div>
            </>
         ) : "Loading..."}

         <div className="row justify-content-between">
          <div className="col-4">
       <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent('"' + randomQuote.text + '"' +randomQuote.author ) } id='tweet-quote' target="_blank" rel="noreferrer" className="btn btn-primary me-4" style={{backgroundColor: color, border:"none"}}><i class="fa-brands fa-twitter"></i></a>
       <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=" + encodeURIComponent("Quotes") + "&caption="+ encodeURIComponent('"'+ randomQuote.text+ '"' + ' -'+ randomQuote.author) + "&canonicalUrl=&shareSource=tumblr_share_button"  } target="_blank" rel="noreferrer" className="btn btn-primary" style={{backgroundColor: color, border:"none"}}><i class="fa-brands fa-tumblr"></i></a>
          </div>
          <div className="col-4">
            <button className="btn btn-primary" id='new-quote' onClick={newQuote} style={{backgroundColor: color, border:"none"}}>New Quote</button>
          </div>
         </div>
        
        </div>
      </div>
      </div>
      

    </div>
  );
}

export default App;
