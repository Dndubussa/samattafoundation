import ApplyForm from "@/components/forms/ApplyForm";
import PageHero from "@/components/layout/PageHero";
import SEO from "@/components/SEO";

const Apply = () => (
  <main>
    <SEO
      title="Apply to Programs - Samatta Foundation"
      description="Apply to join the Samatta Cup and other youth development programs. Transform your potential through sports and education with the Samatta Foundation."
      url="/apply"
    />

    <PageHero
      badge="Join Our Programs"
      title="Program Application"
      description="Apply to join one of our transformative programs and unlock your potential through sports, education, and community development."
    />

    <section className="py-20 bg-[#FAFAF8]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white border border-border rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="mb-8 pb-6 border-b border-border">
            <span className="section-kicker">Application Form</span>
            <h2 className="font-heading text-3xl font-black text-foreground mb-3">Program Application</h2>
            <p className="text-muted-foreground">
              Please fill out all required fields. If applying for a participant under 18, a parent or guardian must complete this form.
            </p>
          </div>
          <ApplyForm />
        </div>
      </div>
    </section>
  </main>
);

export default Apply;