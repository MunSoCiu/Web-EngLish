export default function VideoPlayer({ src }: { src?: string }) {
  return (
    <div className="bg-black rounded-xl aspect-video flex items-center justify-center">
      {src ? (
        <video src={src} controls className="w-full rounded-xl" />
      ) : (
        <span className="text-gray-400">Video</span>
      )}
    </div>
  );
}
