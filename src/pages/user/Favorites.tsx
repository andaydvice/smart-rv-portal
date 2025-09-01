import React from "react";
import { useFavorites } from "@/components/storage/useFavorites";
import { Heart, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserFavorites = () => {
  const { favorites, removeFavorite, isLoading } = useFavorites();

  return (
    <div className="min-h-screen bg-[#080F1F] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Favorite Storage Facilities</h1>
          <p className="text-[#E2E8FF]">Manage your saved storage facilities</p>
        </div>

        {favorites.length === 0 ? (
          <Card className="bg-[#091020] border-gray-700">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
              <p className="text-gray-400 mb-6">
                Start exploring storage facilities and save your favorites for quick access
              </p>
              <Button 
                onClick={() => window.location.href = '/storage-facilities'}
                className="bg-[#60A5FA] hover:bg-blue-600"
              >
                Browse Storage Facilities
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-[#60A5FA]" />
                <h2 className="text-xl font-semibold text-white">
                  {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}
                </h2>
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/storage-facilities'}
                className="border-gray-700 text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Browse More
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((facilityId) => (
                <Card key={facilityId} className="bg-[#091020] border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#60A5FA] text-lg">
                        Storage Facility
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFavorite(facilityId)}
                        disabled={isLoading}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                    <CardDescription className="text-[#E2E8FF] flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Facility ID: {facilityId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-400 text-sm">
                      Enhanced facility details and information will be displayed here once facility data is loaded.
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-700 text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
                        onClick={() => window.location.href = `/storage-facilities?facility=${facilityId}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFavorites;