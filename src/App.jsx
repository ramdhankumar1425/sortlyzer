import { Provider } from "./context/index.jsx";
import Chart from "./components/Chart";
import Header from "./components/Header";

function App() {
    return (
        <div className="w-full h-screen">
            <Provider>
                <Header />

                {/* Main Chart Component */}
                <Chart />
            </Provider>
        </div>
    );
}

export default App;
