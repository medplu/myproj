import { useState } from 'react';
import { AiOutlineClose, AiOutlineLink } from 'react-icons/ai';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import copy from 'copy-to-clipboard';

const ShareModal = ({ postId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const platforms = [
        { name: 'Facebook', icon: <FaFacebook />, url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/api/posts/${postId}` },
        { name: 'Twitter', icon: <FaTwitter />, url: `https://twitter.com/intent/tweet?url=${window.location.origin}/api/posts/${postId}` },
        { name: 'LinkedIn', icon: <FaLinkedin />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/api/posts/${postId}` },
        { name: 'Copy Link', icon: <AiOutlineLink />, action: () => { copy(`${window.location.origin}/api/posts/${postId}`); handleClose(); } }
    ];

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleShare = (platform) => {
        if (platform.action) {
            platform.action();
        } else {
            window.open(platform.url, '_blank');
        }
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
                            {platforms.map((platform) => (
                                <button key={platform.name} onClick={() => handleShare(platform)}>
                                    {platform.icon} {platform.name}
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