import { Provider } from "./context/index.jsx";
import Chart from "./components/Chart";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";

function App() {
    return (
        <>
            <div className="w-full h-screen">
                <Provider>
                    <Header />

                    {/* Main Chart Component */}
                    <Chart />
                </Provider>
            </div>

            {/* Vercel analytics */}
            <Analytics />
        </>
    );
}

export default App;
