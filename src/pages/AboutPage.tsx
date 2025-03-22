
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28">
        <section className="container mx-auto mb-8 px-4">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">About Wesean Times</h1>
          <Separator className="mb-8" />
          
          <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Wesean Times was born from a dream—a dream to unite every Wesean heart, from the youngest to the eldest, under one voice. Led by Salindra Chettri, Co-Advisor of the Wesean High School Students Forum, and Chesa Bhutia, Advisor of the Wesean High School Forum, this newspaper is more than ink on paper; it's a bridge between our past and our future, a call to honor the depth of our culture and the resilience of our people.
            </p>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Every article, every story carries a pulse of Wesea's spirit, woven with pride, love, and hope. Through these pages, we stand together as one Wesean family, honoring our roots and shaping the legacy we'll leave for generations to come.
            </p>
            
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              What makes us unique is the fact that we are entirely run by students.
            </p>
          </div>
          
          <h2 className="text-2xl font-medium mb-4">Our Mission</h2>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-gray-700 mb-4">
              The mission of The Wesean Times is to provide accurate, balanced, and insightful journalism that connects the Wesean community, celebrates our cultural heritage, and documents our collective journey as a people.
            </p>
            <p className="text-gray-700">
              We are committed to telling stories that matter, amplifying voices that deserve to be heard, and creating a platform where the youngest to the eldest Wesean can find representation.
            </p>
          </div>
          
          <h2 className="text-2xl font-medium mb-4">Our Team</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-2">Leadership</h3>
              <p className="text-gray-700">
                <span className="font-medium">Salindra Chettri</span> - Co-Advisor, Wesean High School Students Forum
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Chesa Bhutia</span> - Advisor, Wesean High School Forum
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">Student Contributors</h3>
              <p className="text-gray-700 mb-4">
                The Wesean Times is proudly staffed by dedicated student journalists, editors, photographers, and designers who are passionate about serving their community through quality journalism.
              </p>
              <p className="text-gray-700">
                Our student team brings fresh perspectives, innovative ideas, and authentic voices to every issue we publish.
              </p>
            </div>
          </div>
        </section>
        
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
