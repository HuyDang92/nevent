type FooterProp = {
  className?: string;
};
function Footer({ className }: FooterProp) {
  return (
    <footer className={`${className}`}>
      <h1>Footer</h1>
    </footer>
  );
}

export default Footer;
