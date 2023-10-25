import "./App.css";
import TinderCard from "./components/Card/Card";
import "glider-js/glider.min.css";
import img from "./assets/banco2.png";
import Header from "./components/Header/Header";

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
      <Header />
      <TinderCard
        images={images}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </div>
  );
}

export default App;
