
import {Link} from "react-router";

const Store = () => {
    return (
        <div className="    w-full h-10/10 grid grid-cols-12 gap-4">
            {/* Left Column (Col Span 2) */}
            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-1 md:order-1">
                <h1>Hello from the main page of the app!</h1>
            </div>

            {/* Main Content (Col Span 8) */}
            <div
                className="col-span-12 md:col-span-8 p-4 shadow-md bg-gray-900/25 order-2 md:order-2 flex flex-col">
                <nav>
                    <ul>
                        <li>
                            <Link to="gamelist/popeye">Header Games List</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Right Column (Col Span 2) */}
            <div className="col-span-12 md:col-span-2 p-4 bg-gray-900/25 order-3 md:order-3">
                <p>Here are some examples of links to other pages</p>
            </div>
        </div>
    );
};

export default Store;
