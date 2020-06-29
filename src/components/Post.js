import React from 'react';
import {Col, Card} from 'react-bootstrap';

const Post = ({ post, id }) => {
  return (
    <Col key={id} style={{ marginBottom:"18px"}}>
      <Card style={{ width: 'auto',
            backgroundColor:"#fautoff",
            border:"none",
            boxShadow:"0 2px 2px #efefef"}}>
          <div>             
                
            <Card.Body style={{display:'flex'}}>
                {post.imageUrl &&  
                  <div style={{ padding: '0px 8px 2px 2px'}}>
                    <img style={{ width: '100px'}} variant="top" src={post.imageUrl} alt={post.name} title={post.name} />
                  </div>
                }
               
                <div>
                  {post.name && <Card.Title>{post.name}</Card.Title> }
                  {post.text &&  <Card.Text> {post.text}</Card.Text>  }
                  <hr/>                   
                  {post.set.name &&  <span style={{ margin: '0px 5px', color:"#222"}}> {post.set.name}</span> }
                  {post.type && <span style={{ margin: '0px 5px', color:"#28b351"}}> {post.type} </span> }
                </div>    
            </Card.Body>
          </div>
        </Card> 
    </Col>
  );
}


export default Post;