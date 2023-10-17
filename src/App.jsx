import "./App.css";
import TinderCard from "./components/Card/Card";
import "glider-js/glider.min.css";
import img from "./assets/banco2.png";

function App() {
  const handleLike = () => {
    // Lógica para lidar com o "like"
  };

  const handleDislike = () => {
    // Lógica para lidar com o "dislike"
  };

  const images = [img, img, img];

  return (
    <div className="App">
      <TinderCard
        images={images}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}

export default App;
