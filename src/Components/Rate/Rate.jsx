import { useState } from 'react';
import './Rate.css'
import './RateMedia.css'
import {AiFillStar, AiFillDislike, AiFillLike} from 'react-icons/ai'
import Todo from './RateTodo';


function Rate (){
const [oneStar, setOneStar] = useState (0)
const [twoStar, setTwoStar] = useState (0)
const [ThreeStar, setThreeStar] = useState (0)
const [FourStar, setFourStar] = useState (0)
const [fiveStar, setFiveStar] = useState (0)
const [like, setLike] = useState (0)
const [disLike, setDisLike] = useState (0)
const [todos, setTodos] = useState([]);
const [input, setInput] = useState('');


const handleOneStar = ()=>{
    setOneStar(preOneStar => preOneStar + 5)
}

const handleTwoStar = ()=>{
    setTwoStar(preOneStar => preOneStar + 5)
}

const handleThreeStar = ()=>{
    setThreeStar(preOneStar => preOneStar + 5)
}

const handleFourStar = ()=>{
    setFourStar(preOneStar => preOneStar + 5)
}

const handleFiveStar = ()=>{
    setFiveStar(preOneStar => preOneStar + 5)
}

const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, isCompleted: false }]);
      setInput('');
    }
  };

//   const completeTodo = (index) => {
//     const updatedTodos = [...todos];
//     updatedTodos[index].isCompleted = true;
//     setTodos(updatedTodos);
//   };

//   const removeTodo = (index) => {
//     const updatedTodos = todos.filter((_, i) => i !== index);
//     setTodos(updatedTodos);
//   };




//rating 

const handleLike = () =>{
    setLike(like === 0 ? 1 : 1)
}

const handledisLike = () =>{
    setDisLike(disLike === 0 ? 1 : 1)
}







    return(
        <>
        
        <main className="Rateandreviewcontainer">
          <div className="RateandreviewHolder">

             <div className="RateandreviewHeader">
                 <div className='RateandreviewHeaderimage'>
                 <img src="./src/image/devicon-plain_c4.png" alt=""/>
                 <h3>Creativent</h3>
                 </div>
                 <div className='RateandreviewHeaderprofile'></div>
             </div>

             <section className='sectionTwoRateandReview'>
 

                <div className='ratediscription'>
                <div className='imagerateandreview'></div> 
                    <div className='ratediscriptionholder'>
                    <div className='numbersofreview'>
                        <h3>1527</h3>
                        <h3>review</h3>
                    </div>

                    <div className='rateicons'>
                    <div class="rating">
                        <input value="5" name="rating" id="star5" type="radio"/>
                        <label for="star5"></label>
                        <input value="4" name="rating" id="star4" type="radio"/>
                        <label for="star4"></label>
                        <input value="3" name="rating" id="star3" type="radio"/>
                        <label for="star3"></label>
                        <input value="2" name="rating" id="star2" type="radio"/>
                        <label for="star2"></label>
                        <input value="1" name="rating" id="star1" type="radio"/>
                        <label for="star1"></label>
                        </div>
                        <h3>4.8k</h3>
                    </div>

                    <p>The Curve African Cohort2 Hackathon Presentation <br/>153 kirikiri road Olodi Apapa </p>
                     
                    </div>  
                </div>

                <div className='rateresult'>
                   <div className='resultone'>
                    <div className='numbersofstar'>
                       <h4>5</h4> 
                       <AiFillStar/>
                    </div>
                    <div className='resultline'>
                    <div className='irr' style={{width : `${oneStar}px`, backgroundColor: "gold", height : "100%"}}></div>
                    </div>
                    <h3>90</h3>
                    </div> 

                   <div className='resultone'>
                    <div className='numbersofstar'>
                       <h4>4</h4> 
                       <AiFillStar/>
                    </div>
                    <div className='resultline'>
                    <div className='irr' style={{width : `${twoStar}px`, backgroundColor: "gold", height : "100%"}}></div>
                    </div>
                    <h3>33</h3>
                    </div> 

                   <div className='resultone'>
                    <div className='numbersofstar'>
                       <h4>3</h4> 
                       <AiFillStar/>
                    </div>
                    <div className='resultline'>
                    <div className='irr' style={{width : `${ThreeStar}px`, backgroundColor: "gold", height : "100%"}}></div>
                    </div>
                    <h3>20</h3>
                    </div> 

                   <div className='resultone'>
                    <div className='numbersofstar'>
                       <h4>2</h4> 
                       <AiFillStar/>
                    </div>
                    <div className='resultline'>
                         <div className='irr' style={{width : `${FourStar}px`, backgroundColor: "gold", height : "100%"}}></div>
                    </div>
                    <h3>51</h3>
                    </div> 

                   <div className='resultone'>
                    <div className='numbersofstar'>
                       <h4>1</h4> 
                       <AiFillStar/>
                    </div>
                    <div className='resultline'>
                        <div className='irr' style={{width : `${fiveStar}px`, backgroundColor: "gold", height : "100%"}}>  
                        </div>
                    </div>
                    <h3>31</h3>
                    </div> 
                </div>
             </section>

             <section className='sectionthree'>
                <h3>Rating & Review</h3>
                <div className='ratingdiv'>
                    <h3>Rating</h3>

                    <div className='handlestar'>
                    <AiFillStar className='starcontroler'onClick={handleFiveStar} style={{color :oneStar, "Gold": "gold"}}/>
                    <AiFillStar className='starcontroler'onClick={handleFourStar} style={{color :oneStar, "Gold": "gold"}}/>
                    <AiFillStar className='starcontroler'onClick={handleThreeStar} style={{color :oneStar, "Gold": "gold"}}/>
                    <AiFillStar className='starcontroler'onClick={handleTwoStar} style={{color :oneStar, "Gold": "gold"}}/>
                    <AiFillStar className='starcontroler'onClick={handleOneStar} style={{color :oneStar, "Gold": "gold"}}/>
                    
                    </div>
                   
                
                </div>

                <div className='commentsectionrating'>
                    <h3>Comment</h3>
                    <input type="message" onChange={(e) => setInput(e.target.value)}/>
                </div>
                <div className='submitratings'>
                    <p>submit your rate and review</p>
                    <button onClick={addTodo}>Submit</button>
                </div>
             </section>
            
        <div className='todo-list-holder'>
       
        {todos.map((todo, index) => (
             <div className="todo-list">
                
          <Todo
            key={index}
            index={index}
            todo={todo}
          />

                 <div className='likeanddislike'>
                    <div className='liketoggle'>
                        <AiFillLike className='likecolor'onClick={handleLike}/>
                        <h5>{like}</h5>
                    </div>
                    <div className='disliketoggle'>
                        <AiFillDislike className='dislikecolor' onClick={handledisLike}/>
                        <h5>{disLike}</h5>
                    </div>
                </div>
          </div>
        ))}
     
        </div>


        
            </div>  
        </main>

        </>
    )
}

export default Rate 