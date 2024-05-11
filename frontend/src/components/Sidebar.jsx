

import { MdHomeFilled } from "react-icons/md";

import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LuLibrary } from "react-icons/lu";


const Sidebar = () => {

  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  const { data } = useQuery({ queryKey: ["authUser"] });
  

  return (
    <div className="md:hidden bg-blue-600 bg-opacity-50 fixed bottom-0 left-0 w-full">
      <div className="flex justify-between bg-gray-700 text-white p-2">
        <Link
          to="/"
          className="flex flex-col items-center text-xs p-2"
        >
          <MdHomeFilled className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          to="/landing"
          className="flex flex-col items-center text-xs p-2"
        >
          <LuLibrary className="w-6 h-6" />
          <span className="text-xs">Library</span>
        </Link>

        <Link
          to={`/profile/${data?.username}`}
          className="flex flex-col items-center text-xs p-2"
        >
          <FaUser className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Link>

        {data && (
          <div
            className="flex flex-col items-center text-xs cursor-pointer p-2"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <BiLogOut className="w-6 h-6" />
            <span className="text-xs">Logout</span>
          </div>
        )}
      </div>
       
    
    </div>
  );
};

export default Sidebar;
