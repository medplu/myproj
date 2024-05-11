import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");
  const [showCreatePostFullScreen, setShowCreatePostFullScreen] = useState(
    false
  );

  const handleOpenCreatePostFullScreen = () => {
    setShowCreatePostFullScreen(true);
  };

  const handleCloseCreatePostFullScreen = () => {
    setShowCreatePostFullScreen(false);
  };

  return (
    <>
      <div className="flex-[4_4_0] mr-auto bg-base-200 border-r border-gray-700 min-h-screen" data-theme="synthwave">
        {/* Header */}
        <div className="flex w-full border-b border-gray-700">
          <div
            className={
              "flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            }
            onClick={() => setFeedType("forYou")}
          >
            For you
            {feedType === "forYou" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
            )}
          </div>
          <div
            className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
            onClick={() => setFeedType("following")}
          >
            Following
            {feedType === "following" && (
              <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
            )}
          </div>
        </div>

        {/* POSTS */}
        <Posts feedType={feedType} />
      </div>

      {/* Floating Button */}
      <button
        className="fixed bottom-8 right-4 bg-red-500 text-black p-6 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
        onClick={handleOpenCreatePostFullScreen}
      >
        Create Post
      </button>

      {/* Full-Screen Create Post Modal */}
      {showCreatePostFullScreen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  z-50">
          <div className="relative bg-base-200 p-8 mt-100 rounded-[2.5rem] h-[600px] w-[600px]">
            <CreatePost />
            <IoCloseSharp
              className="absolute top-2 font-bold right-2 text-red-500 hover:text-gray-900 cursor-pointer"
              onClick={handleCloseCreatePostFullScreen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
