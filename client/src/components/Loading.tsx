import { useEffect } from "react";

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
// Super crazy loading animation spinner
const Loading: React.FC<Props> = ({ setLoading }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-appBG">
      <div className="flex flex-row items-center justify-center">
        <img className="w-32 h-32 animate-bounce" src="/umichbucketlogo.png" />
      </div>
      <h1 className="text-2xl text-slate-300 mt-4">Loading...</h1>
    </div>
  );
};

export default Loading;
