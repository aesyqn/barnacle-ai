import React from 'react';
import { useAllMarineData } from '../../hooks/queries/useMarineData';
import { useFleetData } from '../../hooks/queries/useFleetData';
import { useESGData } from '../../hooks/queries/useESGAndPredictions';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../shared/Loading';

// Example component demonstrating TanStack Query usage
const TanStackQueryExample = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Using the new TanStack Query hooks
  const { 
    data: marineData, 
    isLoading: marineLoading, 
    error: marineError,
    isRealTime 
  } = useAllMarineData();
  
  const { 
    data: fleetData, 
    isLoading: fleetLoading, 
    error: fleetError 
  } = useFleetData();
  
  const { 
    data: esgData, 
    isLoading: esgLoading, 
    error: esgError 
  } = useESGData();

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
        <p className="text-gray-600">Please log in to view this data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            TanStack Query Integration Demo
          </h1>
          <p className="text-white/80 mb-2">
            Welcome, {user?.fullName || user?.email}!
          </p>
          <p className="text-white/60 text-sm">
            This demonstrates real-time data fetching with TanStack Query
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Marine Data Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              🌊 Marine Data
              {isRealTime && (
                <span className="ml-2 h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
              )}
            </h2>
            
            {marineLoading ? (
              <Loading size="medium" color="white" message="Loading marine data..." />
            ) : marineError ? (
              <div className="text-red-300">
                Error: {marineError.message}
              </div>
            ) : marineData?.data ? (
              <div className="space-y-3 text-white/80">
                <div>
                  <strong>AIS Vessels:</strong> {marineData.data.ais?.activeVessels || 0}
                </div>
                <div>
                  <strong>Weather Locations:</strong> {marineData.data.weather?.conditions?.length || 0}
                </div>
                <div>
                  <strong>Ocean Currents:</strong> {marineData.data.oceanCurrents?.currents?.length || 0}
                </div>
                <div className="text-xs text-white/60">
                  Last updated: {new Date(marineData.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="text-white/60">No data available</div>
            )}
          </div>

          {/* Fleet Data Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🚢 Fleet Data</h2>
            
            {fleetLoading ? (
              <Loading size="medium" color="white" message="Loading fleet data..." />
            ) : fleetError ? (
              <div className="text-red-300">
                Error: {fleetError.message}
              </div>
            ) : fleetData?.data ? (
              <div className="space-y-3 text-white/80">
                <div>
                  <strong>Total Vessels:</strong> {fleetData.data.summary?.totalVessels || 0}
                </div>
                <div>
                  <strong>Active:</strong> {fleetData.data.summary?.activeVessels || 0}
                </div>
                <div>
                  <strong>In Maintenance:</strong> {fleetData.data.summary?.inMaintenance || 0}
                </div>
                <div>
                  <strong>Avg Biofouling:</strong> {fleetData.data.summary?.avgBiofouling || 0}%
                </div>
                <div className="text-xs text-white/60">
                  Last updated: {new Date(fleetData.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="text-white/60">No data available</div>
            )}
          </div>

          {/* ESG Data Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🌱 ESG Metrics</h2>
            
            {esgLoading ? (
              <Loading size="medium" color="white" message="Loading ESG data..." />
            ) : esgError ? (
              <div className="text-red-300">
                Error: {esgError.message}
              </div>
            ) : esgData?.data ? (
              <div className="space-y-3 text-white/80">
                <div>
                  <strong>Overall Score:</strong> {esgData.data.overall?.esgScore?.toFixed(1) || 0}
                </div>
                <div>
                  <strong>Rating:</strong> {esgData.data.overall?.rating || 'N/A'}
                </div>
                <div>
                  <strong>Carbon Footprint:</strong> {esgData.data.environmental?.carbonFootprint?.total?.toFixed(0) || 0} tons
                </div>
                <div>
                  <strong>Fuel Efficiency:</strong> {esgData.data.environmental?.fuelEfficiency?.average?.toFixed(1) || 0}%
                </div>
                <div className="text-xs text-white/60">
                  Last updated: {new Date(esgData.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="text-white/60">No data available</div>
            )}
          </div>
        </div>

        {/* TanStack Query Features Demo */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">✨ TanStack Query Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <div>
              <h3 className="font-semibold mb-2">🚀 Real-time Updates</h3>
              <p className="text-sm">Data automatically refreshes every 30 seconds for marine data</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">💾 Smart Caching</h3>
              <p className="text-sm">Cached data reduces API calls and improves performance</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔄 Background Refetch</h3>
              <p className="text-sm">Data updates in background when window regains focus</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🛡️ Error Handling</h3>
              <p className="text-sm">Automatic retry with exponential backoff for failed requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TanStackQueryExample;