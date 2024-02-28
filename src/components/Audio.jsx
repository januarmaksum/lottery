export default function Audio({ src, attribute }) {
  return (
    <audio ref={attribute}>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
