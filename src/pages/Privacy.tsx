import SEO from "@/components/SEO";

const Privacy = () => {
  return (
    <main className="pt-32">
      <SEO
        title="Privacy Policy - Samatta Foundation"
        description="Learn how the Samatta Foundation collects, uses, and protects your personal information."
        url="/privacy"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/30 via-sky-50/20 to-background relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-card p-8 md:p-12 rounded-2xl shadow-lg">
            
            <div className="prose prose-lg max-w-none">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Introduction</h2>
              <p className="text-muted-foreground mb-6">
                The Samatta Foundation ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Information We Collect</h2>
              
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Register for our programs</li>
                <li>Subscribe to our newsletter</li>
                <li>Make a donation</li>
                <li>Contact us through our website</li>
                <li>Apply to volunteer</li>
              </ul>

              <p className="text-muted-foreground mb-6">
                This information may include: name, email address, phone number, date of birth, address, and other information you choose to provide.
              </p>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Automatically Collected Information</h3>
              <p className="text-muted-foreground mb-6">
                When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Process your program applications and registrations</li>
                <li>Send you newsletters and updates about our work</li>
                <li>Process donations and provide receipts</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Communicate with you about our programs and events</li>
              </ul>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Information Sharing</h2>
              <p className="text-muted-foreground mb-6">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and delivering services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Partners:</strong> With your consent, we may share information with our program partners</li>
              </ul>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Cookies</h2>
              <p className="text-muted-foreground mb-6">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Children's Privacy</h2>
              <p className="text-muted-foreground mb-6">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Changes to This Policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-muted-foreground mb-6">
                <li className="mb-2">📧 Email: <a href="mailto:info@samattafoundation.org" className="text-secondary hover:underline">info@samattafoundation.org</a></li>
                <li className="mb-2">📞 Phone: +255 712 131 079</li>
                <li className="mb-2">📍 Address: Dar es Salaam, Tanzania</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;

