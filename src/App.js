import CommentWidget from "./Comment/CommentWidget";
import "./App.css";
const App = () => {
  return (
    <div  className="App">
      
      <CommentWidget
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default App;
