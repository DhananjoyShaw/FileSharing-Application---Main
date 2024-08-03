import TopBar from './Topbar';
import Footer from './Footer';

const AboutUs = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="about-container flex flex-col items-center justify-center flex-1 bg-[#edece3] p-4">
                <div className="w-full max-w-2xl text-center">
                    <p className="text-lg text-gray-600 mb-4">
                        Welcome to our file-sharing application! Our mission is to provide a simple, secure, and efficient way for users to share files with each other. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), our application ensures top-notch performance and scalability.
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                        With our platform, you can upload, download, and manage your files with ease. We prioritize your privacy and security, ensuring that your data is safe and protected. Our robust backend is designed to handle large volumes of files and users, providing a seamless experience.
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                        Whether you are sharing files for personal use or collaborating on a project, our application offers the tools you need to stay organized and connected. Our user-friendly interface makes it easy to navigate and find what you need.
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                        Thank you for choosing our file-sharing application. We are committed to continuously improving our service and providing you with the best user experience possible. If you have any questions or feedback, please don&apos;t hesitate to reach out to our support team.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs;
