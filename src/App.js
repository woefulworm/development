import './App.css';
import backpackData from "./backpack.json"
import { useState } from "react";
import { render } from 'react-dom';
class generalItem {
  constructor(name, image, description, value, article, read, cry, price) {
    this.name = name;
    this.image = image;
    this.description = description
    this.value = value
    this.article = article
    this.read = read
    this.cry = cry
    this.price = price
  }
}
const items = []; 
backpackData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
    items.push(new generalItem(item.name, item.image, item.description, item.value, item.article, item.read, item.cry, item.price))
  ))
  //removes from an array
  function myFunction(x, arr) {
    let arrayCopy = arr
    arrayCopy.splice(x, 1); 
    return arrayCopy
  }; 
function App() {

  const [itemArray, setArray] = useState(items)
  const [stolenItems, setStolen] = useState([])
  const [filteredOut, setFilter] = useState([])
  const [stolenStr, setStolenStr] = useState("                 ")
  const [stolenItemsCount, setCount] = useState(0)
  const [stolenItemsVal, setVal] = useState(0)
  const [update, setUpdate] = useState(0)
  const [hiddenButton, setHidden] = useState(true)

  function deleteItem(x) {
    setHidden(false)
    setVal(stolenItemsVal+itemArray[x].price)
    if(stolenItemsCount == 0){
      let arrCopy = stolenItems
      arrCopy.push(itemArray[x])
      setStolen(arrCopy)
      setStolenStr("You've stolen $ worth of my stuff: " + itemArray[x].article + itemArray[x].name.toLowerCase())
      setArray(myFunction(x,itemArray))
      setCount(stolenItemsCount + 1)
    }
    else if(stolenItemsCount==1){
      let arrCopy = stolenItems
      let tempStr = stolenStr
      arrCopy.push(itemArray[x])
      setStolen(arrCopy)
      tempStr = tempStr.replace(' and','')
      tempStr = tempStr + " and " + itemArray[x].article + itemArray[x].name.toLowerCase()
      setStolenStr(tempStr)
      setArray(myFunction(x,itemArray))
      setCount(stolenItemsCount + 1)
    }
    else if(stolenItemsCount==2){
      let arrCopy = stolenItems
      let tempStr = stolenStr
      arrCopy.push(itemArray[x])
      setStolen(arrCopy)
      tempStr = tempStr.replace(' and',',')
      tempStr = tempStr + ", and " + itemArray[x].article + itemArray[x].name.toLowerCase()
      setStolenStr(tempStr)
      setArray(myFunction(x,itemArray))
      setCount(stolenItemsCount + 1)
    }
    else{
      let arrCopy = stolenItems
      let tempStr = stolenStr
      arrCopy.push(itemArray[x])
      setStolen(arrCopy)
      tempStr = tempStr.replace(' and','')
      tempStr = tempStr + ", and " + itemArray[x].article + itemArray[x].name.toLowerCase()
      setStolenStr(tempStr)
      setArray(myFunction(x,itemArray))
      setCount(stolenItemsCount + 1)
    }
    setUpdate(update+1)
  }; 

  function restoreItems() {
    setHidden(true)
    const filterCpy = filteredOut
    for(let i = 0; i<stolenItems.length; i++){
      if (document.getElementById('read').checked && !stolenItems[i].read) {
        filterCpy.push(stolenItems[i])
      }
      else if(document.getElementById('cry').checked && !stolenItems[i].cry){
        filterCpy.push(stolenItems[i])
      }
      else{
        items.push(stolenItems[i])
      }
    }
    var value = document.getElementById("sort").value;
    if(value==1){
      items.sort(function(a,b) {
        return a.value - b.value;
      })
    }
    if(value==2){
      items.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; //https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array
    });
    }
    setArray(items)
    setStolen([])
    setStolenStr("Thank you for returning my items!")
    setCount(0)
    setVal(0)
  };

  function reorder() {
    var value = document.getElementById("sort").value;
    if(value==1){
      items.sort(function(a,b) {
        return a.value - b.value;
      })
    }
    if(value==2){
      items.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; //https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array
    });
    }
    setArray(items)
    setUpdate(update + 1)
  }
  function filter(x){
    //copy of currently filtered items
    let filterCpy = filteredOut

    //copy of currently displayed items
    let arrayCopy = itemArray

    //items to remove from the display
    let toRemoveArr = []

    //items to add back to the display
    let toRemoveFilter = []

    //remove items that are illegible
    if (document.getElementById('read').checked && x==1) {
      for(let i = 0; i<itemArray.length; i++){ //for each element currently shown
        if(!(itemArray[i].read)){ //if it's not readable
          filterCpy.push(itemArray[i]) //add it to the filtered out array
          toRemoveArr.push(i) //add the index to remove to to remove array
        }
      }
      setFilter(filterCpy)
    }

    //add back illegible items (if cry is checked)
    else if ((!document.getElementById('read').checked && x==1) && document.getElementById('cry').checked) {
      for(let i = 0; i<filteredOut.length; i++){
        if(!filteredOut[i].read && filteredOut[i].cry){
          arrayCopy.push(filteredOut[i])
          toRemoveFilter.push(i)
        }
      }
    }

    //remove items that are not cry-worthy
    if (document.getElementById('cry').checked && x==2) {
      for(let i = 0; i<itemArray.length; i++){ //for each element currently shown
        if(!(itemArray[i].cry)){ //if it's not readable
          filterCpy.push(itemArray[i]) //add it to the filtered out array
          toRemoveArr.push(i) //add the index to remove to to remove array
        }
      }
      setFilter(filterCpy)
    }

    //add back dry eye items (if read is checked)
    else if ((!document.getElementById('cry').checked && x==2) && document.getElementById('read').checked) {
      for(let i = 0; i<filteredOut.length; i++){
        if(!filteredOut[i].cry && filteredOut[i].read){
          arrayCopy.push(filteredOut[i])
          toRemoveFilter.push(i)
        }
      }
    }

    //if neither are checked, empty filter array
    else if (!document.getElementById('read').checked && !document.getElementById('cry').checked) {
      for(let i = 0; i<filteredOut.length; i++){
        arrayCopy.push(filteredOut[i])
        toRemoveFilter.push(i)
      }
    }
    
    //clean item array
    for(let i = 0; i<toRemoveArr.length; i++){
      arrayCopy = myFunction(toRemoveArr[i]-i,itemArray); //subtract i to fix indexes being removed
    }
    setArray(arrayCopy)
    reorder()
    //clean filter array
    for(let i = 0; i<toRemoveFilter.length; i++){
      filterCpy = myFunction(toRemoveFilter[i]-i,filteredOut)
    }
    setFilter(filterCpy)

    //update page
    setUpdate(update + 1)
  }


  return (
    <div className="App">
      <header>
        The Contents of My Backpack
      </header>
      <div className='itemsAndSorter'>
          <div className='items' id='items'>
            {itemArray.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
                <div className="item">
                  <h1>{itemArray[index].name}</h1>
                  <img src={item.image}/>
                  <p>{item.description}</p>
                  <button type="button" onClick={() => deleteItem(index)}>Steal from my backpack</button>
                </div>
            ))
            }
          </div>
          <div className="sorter">

            <label for="sort">Sort by: </label>
            <select name="sort" id="sort" onChange={() =>
            reorder()}>
              <option value="1">most valuable (to me)</option>
              <option value="2">alphabetical</option>
            </select>

            <div className='stolen' hidden={hiddenButton}>{stolenStr.slice(0, 14)} <b>${stolenItemsVal.toFixed(2).toString()}</b> {stolenStr.slice(15)}</div>
            <button type="button" hidden={hiddenButton} onClick={() => restoreItems()}>return them to me... please</button><br></br><br></br>

            <input type="checkbox" id="read" name="read" value="read" onChange={() =>
            filter(1)}/>
            <label for="read" className='sortingLabel'>show only things I can read</label><br></br>
            <input type="checkbox" id="cry" name="cry" value="cry"onChange={() =>
            filter(2)}/>
            <label for="cry" className='sortingLabel'>show only items I'd cry about if I lost</label><br></br>
          </div>
        </div>
        <div hidden={true}>
          {update}
        </div>
    </div>
  );
}

export default App;
