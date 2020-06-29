import React, {useState, useEffect} from 'react';
import {Navbar, Container, Row, Spinner, Button, Nav, FormControl} from 'react-bootstrap';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import 'bootstrap/dist/css/bootstrap.css';

const Posts = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [page, setPage] =  useState(1);
  const [pageSize, setPageSize] = useState(5);
  
  const [isSpinner, setIsSpinner] = useState(true);
  const [dataFound, setDataFound] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [searchButton, setSearchButton] = useState(true);
 
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(e.target.value);
  }
  
  const fetchPosts = async (query) => {    
    let url = 'https://api.elderscrollslegends.io/v1/cards?';
    setHasMore(true);
    setPage(page);
    let size = setPageSize(pageSize+5);
   // name = query;
    console.log('name', query);
    if(query && query.length>0){
      console.log("hey if");
      url+='name='+query;    
      setHasMore(false);
      setPosts([]);
      setPageSize(5);

    }else{
      console.log("hey else");
      url += 'page='+page;
      setHasMore(true);
    }  
    url += '&pageSize='+pageSize;
    setIsSpinner(true);
    setDataFound(true);
    setHasMore(true);
    
    const res = await axios.get(url);
    console.log(url);
    if(res.data.cards.length === 0){
      setDataFound(false);
      setIsSpinner(false);
    }else {
      setDataFound(true);
      setIsSpinner(false);
    }

    if(res.data){      
      if(res.data.cards.length){ 
       // console.log('pageSize', pageSize);
        if(size === 100){
          setPage(page+1);
          setPageSize(0);
          setPosts(prevPosts => {
            return [...new Set([...prevPosts, ...res.data.cards])]
          });
          
        }else {
          setPageSize(res.data._pageSize);
          setPage(page+1);
          setPosts(prevPosts => {
            return [...new Set([...prevPosts, ...res.data.cards])]
          });
        }
      }
    }else {

    }
  };

  //onload
  useEffect(() => {    
    fetchPosts();
  },[]); 

  const handleClick = (e) => {
    //setPage(1);
    proceedToSearch();   
  }

  const proceedToSearch = async () => {
    if(query.length>0){      
        setSearchButton(true);
        setPage(1);
        setError('');
        setPageSize(5);
        fetchPosts(query);
    }else{
      setError('Search value cannot be empty!');
    }
    
  }
  const handleKeyDown = (e) => {
    e.preventDefault(); 
    if(e.key === 'Enter'){
      proceedToSearch();
    }
  }
  

  return (
    <>
      <Navbar fixed="top" expand="lg" style={style.navbar} bg="dark" variant="dark">
        <Navbar.Brand style={{display: "flex",alignItems: "center"}}  href="#home">
          <h4>Fetching Results from API </h4>            
        </Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <div>
              <div style={{display:'flex'}}>
              <FormControl className="mr-sm-2" name="query" value={query} onChange={e => handleSearch(e)} onKeyUp={e => handleKeyDown(e)} style={style.queryName} placeholder="Search card" />
              <Button  type="button" disabled={!searchButton} onClick={e => handleClick(e)}>Search</Button>
              </div>
              <div>
                <span className="text-danger">{error}</span>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      
      <Container style={{paddingTop:"120px"}}>  
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          style={{overflow:'hidden !important'}}
          loader={
            (!isSpinner)
            ?null
            :(<Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>)
          } 
        >
          <Row xs={1} md={1} lg={2}>  
            {posts.map((post, id) => (
              <Post key={id} post={post} />
            ))}                        
          </Row>            
        </InfiniteScroll> 
        {(dataFound)
          ?(<div style={{padding:'8px'}}>
              <button style={style.refreshBtn} 
                onClick={async ()=>{
                  await (
                    setQuery(''),
                    setPageSize(0),
                    setPage(1)
                  ); 
                  fetchPosts();
                }}>Load Initial cards</button>
            </div>)
          :(<div style={{padding:'8px'}}>
            <span>No data found</span>
              <button style={style.refreshBtn} onClick={async ()=>{
                await (
                  setQuery(''),
                  setPageSize(0),
                  setPage(1)
                ); 
                fetchPosts();
                }}>Click to reload </button>
        </div>)}
      </Container>
    </>
  );
};

var style = {
  refreshBtn:{
    width: 'auto',
    margin:"0px 5px",
    backgroundColor:"#fff",
    border:"none",
    boxShadow:"0 2px 2px #efefef",
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  queryName:{
    padding:"8px 15px",
    backgroundColor: "#fff",
    borderRadius:"2px",
    border:"none",
    display:'inline',
    marginRight:"5px",
  }
}

export default Posts;