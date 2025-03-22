
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-medium mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p>Last Updated: July 1, 2023</p>
            
            <h2>1. Information We Collect</h2>
            <p>The Wesean Times collects personal information that you voluntarily provide when subscribing to our newsletter, commenting on articles, or contacting us. This may include your name, email address, and other contact details.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Deliver the newsletter you subscribed to</li>
              <li>Respond to your inquiries</li>
              <li>Improve our website and services</li>
              <li>Send updates about our organization or services, when permitted</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2>3. Cookies and Tracking Technologies</h2>
            <p>Our website uses cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            
            <h2>4. Data Security</h2>
            <p>We implement appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our site.</p>
            
            <h2>5. Third-Party Services</h2>
            <p>We may employ third-party companies and individuals to facilitate our website, provide services on our behalf, perform service-related services or assist us in analyzing how our website is used. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            
            <h2>6. Your Rights</h2>
            <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. The Wesean Times aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Information. You have the right to access, update or to delete the information we have on you.</p>
            
            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.</p>
            
            <h2>8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@weseantimes.ink.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
