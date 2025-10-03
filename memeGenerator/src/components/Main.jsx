import React from "react";
export default function Main()
{
  const[meme , setMeme] = React.useState({
    topText: "",
    bottomText: "",
    image: "http://i.imgflip.com/1bij.jpg"});

  const[allMemes , setAllMeme] = React.useState([])
  React.useEffect(function()
{
  fetch("https://api.imgflip.com/get_memes")
  .then(res=>res.json())
  .then(data=>setAllMeme(data.data.memes))
},[])

function getMeme()
    {
        const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)];
        setMeme(function(prevMeme)
        {
            return({...prevMeme, image : randomMeme.url})
        })  
    }
    
  function handleChangeTop(event)
  {
    const {value} = event.currentTarget ;
    setMeme(function(prevMeme)
    {
      return({...prevMeme, topText : value})
    })
  }
  function handleChangeBottom(event)
  {
    const {value} = event.currentTarget ;
    setMeme(function(prevMeme)
    {
      return({...prevMeme, bottomText : value})
    })
  }
  return (
  <main>
    <div className="formContainer">
    <div className="containerText">
    <label className="label1" htmlFor ="top" >Top text</label>
    <input type="text" id = "top" className="label" name="top" placeholder="Enter text for top...." onChange={handleChangeTop} value={meme.topText}></input>
    </div>
    <div className="containerText">
    <label className="label1" htmlFor="bottom" >Bottom text</label>
    <input type="text" id = "bottom" className="label" name="bottom" placeholder="Enter text for bottom...." onChange={handleChangeBottom} value ={meme.bottomText}></input>
    </div>
    </div>
    <div className ="buttonDiv">
    <button className="imgButton" onClick = {getMeme}>Get a new image</button>
    </div>
    <div className="meme">
      <img src= {meme.image}/>
      <span className="top">{meme.topText}</span>
      <span className="bottom">{meme.bottomText}</span>
    </div>
  </main>) ;
}