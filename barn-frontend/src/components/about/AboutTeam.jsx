import React, { useState, useEffect } from 'react';
import { TEAM_MEMBERS } from '../../constants/aboutConstants';
import { DESIGN_TOKENS } from '../../constants/designTokens';
import { Fish, Seahorse, Starfish, Coral } from '../shared/MarineElement';

const CompanyInfoSection = () => {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentMember = TEAM_MEMBERS[currentMemberIndex];

  // Auto-advance functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [currentMemberIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMemberIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMemberIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handleMemberSelect = (index) => {
    if (index !== currentMemberIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMemberIndex(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center items-center pt-32 pb-32">
      {/* Background Decorations with Marine Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
        <div className="absolute bottom-32 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Marine elements */}
        <div className="absolute top-16 right-20">
          <Fish size={100} opacity={0.12} animationSpeed={8} />
        </div>
        <div className="absolute bottom-20 left-20">
          <Seahorse size={80} opacity={0.15} animationSpeed={6} />
        </div>
        <div className="absolute top-1/3 left-16">
          <Starfish size={60} opacity={0.18} animationSpeed={7} />
        </div>
        <div className="absolute bottom-1/3 right-16">
          <Coral size={70} opacity={0.14} animationSpeed={5} />
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Professional Photo */}
          <div className="relative">
            {/* Modern card design for photo */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              {/* Photo container */}
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                <div className={`text-center transition-all duration-500 ease-in-out transform ${
                    isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}>
                    {currentMember.image ? (
                        <img
                            src={currentMember.image}
                            alt={'portrait of ' + currentMember.name}
                            className="w-full h-full object-cover rounded-xl shadow-md"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gradient-to-br from-teal-200 to-blue-200 rounded-full mx-auto flex items-center justify-center shadow-lg">
                            <div className="text-gray-700 text-2xl font-bold">
                                {currentMember.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                    )}
                    <p className="text-gray-500 text-sm font-medium mt-4">Team Member of <em>SeaWise</em></p>
                </div>
            </div>
            </div>
            </div>

          {/* Right Side - Team Member Info */}
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-teal-600 rounded-full mr-2 animate-pulse" />
                MEET OUR TEAM
              </div>
            </div>

            {/* Team Member Name */}
            <h1 className={`text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight text-center lg:text-left transition-all duration-500 ease-in-out transform ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              {currentMember.name}
            </h1>

            {/* Role */}
            <p className={`text-xl lg:text-2xl text-teal-600 font-semibold text-center lg:text-left transition-all duration-500 ease-in-out transform ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              {currentMember.role}
            </p>

            {/* Member Bio */}
            <div className="pt-4">
              <p className={`text-gray-700 text-lg leading-relaxed text-center lg:text-left transition-all duration-500 ease-in-out transform ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
                {currentMember.bio}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 pt-8">
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                aria-label="Previous team member"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                aria-label="Next team member"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Team Member Indicators */}
            <div className="flex justify-center lg:justify-start space-x-2 pt-4">
              {TEAM_MEMBERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleMemberSelect(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentMemberIndex ? 'bg-teal-500 scale-110 shadow-md' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View team member ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default CompanyInfoSection;