import Header from './components/Header';
import Body from './components/Body';
import { useState } from 'react';
function App() {
  const [search,setSearch] = useState({});
  const onSearch = (e) => {
    setSearch({search:e.target.value});
  }
  return (
    <div className="App">
     <Header onSearch={onSearch}/>
     <Body  search={search} />
    </div>
  );
}

export default App;
