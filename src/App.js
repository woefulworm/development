import './App.css';
import backpackData from "./backpack.json"


function App() {
  return (
    <div className="App">
      <header>
        The Contents of My Backpack: 11/25/22, 3:50 PM
      </header>
      <div className='center-this'>
        <div className='items'>
          {backpackData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
                <div className="item">
                  <h1>{item.name}</h1>
                  <img src={item.image}/>
                  <p>{item.description}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
