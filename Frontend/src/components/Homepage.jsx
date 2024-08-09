import coverPhoto from '../assets/Designer.jpg';
import Footer from './Footer';
import TopBar from './Topbar';

const Homepage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="flex flex-1 items-center justify-center px-10 pt-4 bg-[#edece3] md:px-[100px]">
                <div className="flex flex-col items-start justify-center w-1/2 p-10">
                    <header className="text-4xl font-bold mb-4 text-black">
                        Welcome to Your File Sharing Application ...
                    </header>
                    <main className="text-2xl font-semibold text-gray-900">
                        <p>Access all your files from any device and keep them organized in one place with 10GB of free storage.</p>
                    </main>
                </div>
                <div className="w-1/2 flex justify-center">
                    <img src={coverPhoto} alt="File Sharing Application Cover Photo" className="object-cover w-4/5 h-auto mix-blend-multiply" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Homepage;