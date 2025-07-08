import React from 'react';
import { MapPin, Phone, Clock, Star, Shield } from 'lucide-react';
import StructuredData from './StructuredData';

interface LocalSEOInfoProps {
  businessName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  hours?: Array<{
    day: string;
    hours: string;
  }>;
  serviceAreas?: string[];
  showSchema?: boolean;
}

const LocalSEOInfo: React.FC<LocalSEOInfoProps> = ({
  businessName = "Smart RV Technology",
  address = "123 Innovation Drive",
  city = "Austin",
  state = "Texas",
  zipCode = "78701",
  phone = "+1-800-SMART-RV",
  email = "info@smartrvtech.com",
  website = "https://smartrvtech.com",
  hours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  serviceAreas = ["Texas", "Oklahoma", "Arkansas", "Louisiana", "New Mexico"],
  showSchema = true
}) => {
  const localBusinessSchema = {
    "@type": "LocalBusiness",
    name: businessName,
    image: `${website}/logo.png`,
    "@id": website,
    url: website,
    telephone: phone,
    email: email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      addressRegion: state,
      postalCode: zipCode,
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.2672,
      longitude: -97.7431
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00"
      }
    ],
    sameAs: [
      "https://facebook.com/smartrvtech",
      "https://twitter.com/smartrvtech",
      "https://linkedin.com/company/smartrvtech"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127"
    },
    areaServed: serviceAreas.map(area => ({
      "@type": "State",
      name: area
    }))
  };

  return (
    <>
      {showSchema && (
        <StructuredData type="Organization" data={localBusinessSchema} />
      )}
      
      <section className="py-16 bg-[#080F1F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Visit Our Location</h2>
              <p className="text-gray-300 text-lg">
                Experience the future of RV technology at our Austin headquarters
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-[#151A22] rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <MapPin className="h-5 w-5 text-[#5B9BD5] mr-2" />
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-1">Address</h4>
                    <p className="text-gray-300">
                      {address}<br />
                      {city}, {state} {zipCode}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-1 flex items-center">
                      <Phone className="h-4 w-4 text-[#5B9BD5] mr-1" />
                      Phone
                    </h4>
                    <a href={`tel:${phone}`} className="text-[#5B9BD5] hover:text-[#4B8FE3] transition-colors">
                      {phone}
                    </a>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-1">Email</h4>
                    <a href={`mailto:${email}`} className="text-[#5B9BD5] hover:text-[#4B8FE3] transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-[#151A22] rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Clock className="h-5 w-5 text-[#5B9BD5] mr-2" />
                  Business Hours
                </h3>
                
                <div className="space-y-3">
                  {hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-300">{schedule.day}</span>
                      <span className="text-white font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white font-medium">4.8/5</span>
                    <span className="text-gray-400 ml-2">(127 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-gray-300 text-sm">Verified Business</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="mt-8 bg-[#151A22] rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Service Areas</h3>
              <p className="text-gray-300 mb-4">
                We proudly serve customers throughout the Southwest United States:
              </p>
              <div className="flex flex-wrap gap-3">
                {serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-[#5B9BD5]/10 text-[#5B9BD5] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocalSEOInfo;