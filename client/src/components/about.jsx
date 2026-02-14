import react from 'react'

const About = ()=>{
    return(
        <>
            <div className="p-8 bg-teal-100">
                <h1 className='text-center text-4xl tracking-wide font-bold text-teal-800'>About Dropnest</h1>
                <p className="text-center text-gray-700 mt-4">Dropnest is a secure, simple, and elegant file management platform designed to make uploading, organizing, and sharing files effortless. Our platform ensures your files are protected with industry-standard encryption and backed by a reliable infrastructure that guarantees performance and uptime. <br /> <br />Whether you're a professional managing important documents, a creative sharing portfolios, or anyone who needs reliable file storage, Drop Nest has you covered. <br />Drop Nest is a modern file management platform designed with simplicity and security in mind. We believe file sharing should be effortless, not complicated.</p>
                <div className="">
                    <ul className='ml-50 mt-6 list-disc'>
                        <li className=" text-gray-600 mt-2">Secure File Storage</li>
                        <li className=" text-gray-600 mt-2">Fast and Reliable Uploads</li>
                        <li className=" text-gray-600 mt-2">Easy File Organization</li>
                        <li className=" text-gray-600 mt-2">Simple and Intuitive Interface</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default About;