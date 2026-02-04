interface FooterProps {
  footerText: string;
  primaryColor: string;
}

export default function Footer({ footerText, primaryColor }: FooterProps) {
  return (
    <footer
      className="mt-auto py-8"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-white text-sm">{footerText}</p>
      </div>
    </footer>
  );
}
