import {useEffect,useState} from 'react'; 
import "../css/Feed.css";
function Feed(props){   
    let userState; 
    if(props.user!==null){
        userState=true; 
    } else{
        userState=false;
    }   
    
    
    
    let [MostPopular,setPopular] = useState([]);
    let [TimeWire,setTimeWire] = useState([]);
    let [MoviewRewiew,setMovies] = useState([]);
    let [Books,setBooks] = useState([]); 
    let [TopStories,setTop] = useState([]);
    useEffect(()=>{
        fetch("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=OdPCD4uXVDvvs9RTXv1xUkjak8xdO1Oq")
        .then(result => result.json())
        .then(result => setPopular(result.results))

        fetch("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=OdPCD4uXVDvvs9RTXv1xUkjak8xdO1Oq")
        .then(result => result.json())
        .then(result => setTimeWire(result.results))

        fetch("https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=OdPCD4uXVDvvs9RTXv1xUkjak8xdO1Oq")
        .then(result => result.json())
        .then(result => setMovies(result.results))

        fetch("https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=OdPCD4uXVDvvs9RTXv1xUkjak8xdO1Oq")
        .then(result => result.json())
        .then(result => setBooks(result.results))

        fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=OdPCD4uXVDvvs9RTXv1xUkjak8xdO1Oq")
        .then(result => result.json())
        .then(result => setTop(result.results))

    },[])

    
    let [number,setNumber] = useState(1); 


    return(<div className="feed">
        <button onClick={()=>{setNumber(1)}}>Most Popular</button>
        <button onClick={()=>{setNumber(2)}}>Time Wire</button>
        <button onClick={()=>{setNumber(3)}}>Movie Rewiew</button>
        <button onClick={()=>{setNumber(4)}}>Books</button>
        <button onClick={()=>{setNumber(5)}}>Top Stories</button>

        <FeedList number={number} popular={MostPopular} timeWire={TimeWire} movies={MoviewRewiew} books={Books} top={TopStories}
        userState={userState}/> 
    </div>) 
    
   
   
    
}

function  FeedList(props) {
    switch(props.number){
        case 1: 
        return (props.popular.map((item)=>(
            <FeedPost title={item.title} description={item.abstract} link={item.url} state={props.userState}/>
        ))) 
        break; 
        case 2: 
        return(props.timeWire.map((item)=>(
            <FeedPost title={item.title} description={item.abstract} link={item.url} state={props.userState}/>
        )))
        break; 
        case 3: 
        return(props.movies.map((item)=>(
            <FeedPost title={item.display_title} description={item.headline} link={item.link.url} state={props.userState}/>
        )))
        break;
        case 4: 
        return(props.books.map((item)=>(
            <FeedPost title={item.title} description={item.description} link={item.url} state={false}/>
        )))
        break;
        case 5: 
        return(props.top.map((item)=>(
            <FeedPost title={item.title} description={item.abstract} link={item.url} state={props.userState}/>
        )))

        
    }
}
function  FeedPost(props) {
    let state = props.state? "show" : "hide"
    return(
    <div className="feedPost">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <button className={state}>
        <a href={props.link}>Click to Open </a> 
        </button>
    </div>)
}


export default Feed; 