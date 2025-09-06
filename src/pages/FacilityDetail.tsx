import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Star, Phone, Clock, Shield, DollarSign } from 'lucide-react';
import { useStorageFacilities } from '@/components/storage/useStorageFacilities';

const FacilityDetail = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  const { facilities } = useStorageFacilities({
    features: {
      indoor: false,
      climate_controlled: false,
      "24h_access": false,
      security_system: false,
      vehicle_washing: false
    },
    priceRange: [0, 1000],
    selectedState: null,
    minRating: null
  });

  const facility = facilities?.find(f => f.id === facilityId);

  if (!facility) {
    return (
      <div className="min-h-screen bg-[#080F1F] text-white p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => navigate('/storage-facilities')} 
            variant="ghost" 
            className="mb-4 text-[#60A5FA] hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Storage Facilities
          </Button>
          <Card className="bg-[#091020] border-gray-700">
            <CardContent className="p-8 text-center">
              <p className="text-xl text-gray-400">Facility not found</p>
              <p className="text-gray-500 mt-2">The requested facility could not be located.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080F1F] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => navigate('/storage-facilities')} 
          variant="ghost" 
          className="mb-6 text-[#60A5FA] hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Storage Facilities
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl text-white mb-2">{facility.name}</CardTitle>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-5 w-5" />
                    <span>{facility.address}, {facility.city}, {facility.state}</span>
                  </div>
                </div>
                {facility.avg_rating && (
                  <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-yellow-500 font-semibold">{facility.avg_rating.toFixed(1)}</span>
                    {facility.review_count && (
                      <span className="text-gray-400 text-sm ml-1">({facility.review_count})</span>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#60A5FA] flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-400">{facility.contact_phone || 'Not available'}</p>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400">{facility.contact_email || 'Not available'}</p>
                </div>
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-gray-400">{facility.address}</p>
                  <p className="text-gray-400">{facility.city}, {facility.state}</p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#60A5FA] flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-white font-medium">Price Range</p>
                  <p className="text-gray-400">
                    ${facility.price_range.min} - ${facility.price_range.max} {facility.price_range.currency}/month
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#60A5FA] flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {facility.features.security_system && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Security System</span>
                    </div>
                  )}
                  {facility.features["24h_access"] && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">24/7 Access</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="bg-[#091020] border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#60A5FA] flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Coordinates</span>
                    <span className="text-white text-sm">{facility.latitude.toFixed(4)}, {facility.longitude.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">State</span>
                    <span className="text-white">{facility.state}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amenities */}
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#60A5FA]">Amenities & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {facility.features.indoor && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Indoor Storage</span>
                  </div>
                )}
                {facility.features.climate_controlled && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Climate Controlled</span>
                  </div>
                )}
                {facility.features["24h_access"] && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">24/7 Access</span>
                  </div>
                )}
                {facility.features.security_system && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Security System</span>
                  </div>
                )}
                {facility.features.vehicle_washing && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Vehicle Washing</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card className="bg-[#091020] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#60A5FA]">Data Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${facility.verified_fields.features ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-300 text-sm">Features {facility.verified_fields.features ? 'Verified' : 'Unverified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${facility.verified_fields.price_range ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-300 text-sm">Pricing {facility.verified_fields.price_range ? 'Verified' : 'Unverified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${facility.verified_fields.contact_info ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-300 text-sm">Contact {facility.verified_fields.contact_info ? 'Verified' : 'Unverified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${facility.verified_fields.location ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-300 text-sm">Location {facility.verified_fields.location ? 'Verified' : 'Unverified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${facility.verified_fields.business_hours ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-gray-300 text-sm">Hours {facility.verified_fields.business_hours ? 'Verified' : 'Unverified'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;