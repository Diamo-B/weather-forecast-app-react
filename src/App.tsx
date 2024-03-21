import RightPanel from './components/RightPanel';
import LeftPanel from './components/LeftPanel';

function App() {
  return (
    <div
      className="w-full h-full max-h-dvh bg-auto 2xl:bg-cover bg-no-repeat bg-center flex flex-col"
      style={{ backgroundImage: "url('/stormy.jpg')" }}
    >
      <div className="w-full h-full grid grid-cols-4 pr-5">
        <LeftPanel/>
        <RightPanel/>
      </div>
    </div>
  );
}

export default App;
