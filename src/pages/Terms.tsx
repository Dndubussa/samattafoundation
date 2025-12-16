import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <main className="pt-32">
      <SEO
        title="Terms of Service - Samatta Foundation"
        description="Read the terms and conditions for using the Samatta Foundation website and services."
        url="/terms"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Terms of Service
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
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Agreement to Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing or using the Samatta Foundation website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Use of Services</h2>
              
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Eligibility</h3>
              <p className="text-muted-foreground mb-6">
                You must be at least 13 years old to use our services. For minors under 18, parental or guardian consent is required for program participation.
              </p>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Acceptable Use</h3>
              <p className="text-muted-foreground mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for any fraudulent purposes</li>
                <li>Impersonate any person or entity</li>
              </ul>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Program Participation</h2>
              
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Applications</h3>
              <p className="text-muted-foreground mb-6">
                Submission of a program application does not guarantee acceptance. The Samatta Foundation reserves the right to accept or reject applications at its sole discretion.
              </p>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Conduct</h3>
              <p className="text-muted-foreground mb-6">
                Program participants are expected to maintain respectful behavior, follow program rules, and represent the Samatta Foundation positively. Violation of conduct standards may result in removal from programs.
              </p>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Health and Safety</h3>
              <p className="text-muted-foreground mb-6">
                Participants must disclose any medical conditions or special requirements. The Foundation will make reasonable efforts to accommodate special needs but cannot guarantee suitability for all individuals.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Donations</h2>
              <p className="text-muted-foreground mb-4">
                All donations to the Samatta Foundation are:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6">
                <li>Voluntary and non-refundable</li>
                <li>Used to support our programs and operations</li>
                <li>Acknowledged with a receipt for tax purposes where applicable</li>
                <li>Subject to our discretion in allocation unless specified for a particular program</li>
              </ul>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Intellectual Property</h2>
              <p className="text-muted-foreground mb-6">
                The content on our website, including text, graphics, logos, images, and software, is the property of the Samatta Foundation and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Photography and Media</h2>
              <p className="text-muted-foreground mb-6">
                By participating in our programs or events, you consent to being photographed or recorded. These materials may be used for promotional purposes, including on our website, social media, and marketing materials. If you object to such use, please notify us in writing.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Liability and Disclaimers</h2>
              
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Assumption of Risk</h3>
              <p className="text-muted-foreground mb-6">
                Participation in sports and physical activities carries inherent risks. Participants and guardians acknowledge these risks and agree to participate at their own risk.
              </p>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Limitation of Liability</h3>
              <p className="text-muted-foreground mb-6">
                To the fullest extent permitted by law, the Samatta Foundation shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or participation in our programs.
              </p>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-4 mt-8">Website Availability</h3>
              <p className="text-muted-foreground mb-6">
                We do not guarantee that our website will be available at all times. We may experience interruptions, errors, or delays in service without liability.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Third-Party Links</h2>
              <p className="text-muted-foreground mb-6">
                Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these sites.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Termination</h2>
              <p className="text-muted-foreground mb-6">
                We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Governing Law</h2>
              <p className="text-muted-foreground mb-6">
                These Terms shall be governed by and construed in accordance with the laws of Tanzania, without regard to its conflict of law provisions.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Changes to Terms</h2>
              <p className="text-muted-foreground mb-6">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of the modified Terms.
              </p>

              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 mt-12">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-muted-foreground mb-6">
                <li className="mb-2">📧 Email: <a href="mailto:info@samattafoundation.org" className="text-secondary hover:underline">info@samattafoundation.org</a></li>
                <li className="mb-2">📞 Phone: +255 712 131 079</li>
                <li className="mb-2">📍 Address: Dar es Salaam, Tanzania</li>
              </ul>

              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground font-semibold">
                  By using the Samatta Foundation website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms;

