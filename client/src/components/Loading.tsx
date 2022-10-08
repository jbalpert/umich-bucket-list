import { useEffect } from "react";
import { UseGlobalState } from "../contexts/GlobalStateContext";
// Super crazy loading animation spinner
const Loading: React.FC = () => {
  const { setLoading } = UseGlobalState();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setLoading]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-appBG">
      <div className="flex flex-row items-center justify-center">
        <img
          className="w-32 h-32 animate-bounce"
          src="/umichbucketlogo.png"
          alt="umichbucketlogo"
        />
      </div>
      <h1 className="text-2xl text-slate-300 mt-4">Loading...</h1>
    </div>
  );
};

export default Loading;
