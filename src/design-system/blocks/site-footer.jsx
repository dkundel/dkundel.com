export function SiteFooter({ image, children }) {
  return (
    <footer className="footer-container">
      <p className="mb-0 flex justify-center">
        <img
          className="panda"
          src={image.src}
          width={image.width}
          height={image.height}
          alt="Panda emoji sitting in front of laptop"
        />
        {children}
      </p>
      <p>
        Made by{' '}
        <a
          href="https://github.com/dkundel/dkundel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dominik Kundel
        </a>
      </p>
    </footer>
  );
}
