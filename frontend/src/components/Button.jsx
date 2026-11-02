export function Button({
  imgPath,
  text,
  children,
  alt = "button icon",
  className,
  onPress,
}) {
  return (
    <button
      onClick={onPress}
      className={`flex items-center justify-center bg-[#005CA1] text-white w-full h-13 rounded-lg ${className}`}
    >
      {imgPath && (
        <img src={imgPath} alt={alt} className="max-w-8 max-h-7 mr-2 " />
      )}
      {text || children}
    </button>
  );
}
