
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const TermsOfService = () => {
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
          <h1 className="text-3xl md:text-4xl font-medium mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p>Last Updated: July 1, 2023</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using The Wesean Times website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on The Wesean Times's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose;</li>
              <li>attempt to decompile or reverse engineer any software contained on The Wesean Times's website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h2>3. Disclaimer</h2>
            <p>The materials on The Wesean Times's website are provided on an 'as is' basis. The Wesean Times makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2>4. Limitations</h2>
            <p>In no event shall The Wesean Times or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Wesean Times's website, even if The Wesean Times or a The Wesean Times authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h2>5. Accuracy of materials</h2>
            <p>The materials appearing on The Wesean Times's website could include technical, typographical, or photographic errors. The Wesean Times does not warrant that any of the materials on its website are accurate, complete or current. The Wesean Times may make changes to the materials contained on its website at any time without notice. However The Wesean Times does not make any commitment to update the materials.</p>
            
            <h2>6. Links</h2>
            <p>The Wesean Times has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by The Wesean Times of the site. Use of any such linked website is at the user's own risk.</p>
            
            <h2>7. Modifications</h2>
            <p>The Wesean Times may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
            
            <h2>8. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
