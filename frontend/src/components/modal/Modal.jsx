import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const ShareModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const platforms = [
        { name: 'Facebook', icon: <FaFacebook /> },
        { name: 'Twitter', icon: <FaTwitter /> },
        { name: 'LinkedIn', icon: <FaLinkedin /> },
        { name: 'Instagram', icon: <FaInstagram /> }
    ];

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Share</button>

            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex justify-end">
                            <button onClick={handleClose}>
                                <AiOutlineClose />
                            </button>
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                            {platforms.map(({ name, icon }) => (
                                <button key={name}>
                                    {icon} {name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareModal;
