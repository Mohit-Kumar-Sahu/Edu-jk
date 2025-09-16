import React from 'react';

interface QuizResultsProps {
  results: {
    answers: string[];
    timestamp: string;
    recommendations: string[];
    detailed_recommendations?: any[];
    aptitude: Record<string, number>;
    personality_profile?: Record<string, any>;
  };
  onRetake?: () => void;
}

export function QuizResults({ results, onRetake }: QuizResultsProps) {
  const { recommendations, detailed_recommendations, aptitude, personality_profile } = results;

  // Calculate dominant RIASEC types
  const sortedAptitude = Object.entries(aptitude)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const riasecNames = {
    R: 'Realistic',
    I: 'Investigative', 
    A: 'Artistic',
    S: 'Social',
    E: 'Enterprising',
    C: 'Conventional'
  };

  const riasecDescriptions = {
    R: 'You prefer hands-on, practical work with tools, machines, and physical materials.',
    I: 'You enjoy research, analysis, and solving complex problems through investigation.',
    A: 'You are drawn to creative, expressive activities and innovative thinking.',
    S: 'You like helping, teaching, and working with people to improve their lives.',
    E: 'You enjoy leading, persuading, and managing people and projects.',
    C: 'You prefer organized, systematic work with data, details, and established procedures.'
  };

  const maxScore = Math.max(...Object.values(aptitude));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Career Assessment Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your responses, here are your personalized career recommendations and personality insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Career Recommendations */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Recommended Careers</h2>
            </div>

            <div className="space-y-4">
              {detailed_recommendations && detailed_recommendations.length > 0 ? (
                detailed_recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{rec.career}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {Math.round(rec.matchPercentage)}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{rec.typeName}:</span> {rec.description}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${rec.matchPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  {recommendations.map((career, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                      <h3 className="text-lg font-semibold text-gray-800">{career}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIASEC Profile */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Your RIASEC Profile</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(aptitude).map(([type, score]) => {
                const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                const colors = {
                  R: 'from-red-400 to-red-600',
                  I: 'from-blue-400 to-blue-600',
                  A: 'from-purple-400 to-purple-600',
                  S: 'from-green-400 to-green-600',
                  E: 'from-yellow-400 to-yellow-600',
                  C: 'from-gray-400 to-gray-600'
                };

                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-gray-800">
                          {type} - {riasecNames[type as keyof typeof riasecNames]}
                        </span>
                        <p className="text-sm text-gray-600">
                          {riasecDescriptions[type as keyof typeof riasecDescriptions]}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-gray-700">{score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${colors[type as keyof typeof colors]} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personality Insights */}
        {personality_profile && (
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Personality Insights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAptitude.map(([type, score]) => {
                const profile = personality_profile[type];
                if (!profile || profile.percentage < 5) return null;

                return (
                  <div key={type} className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600 mb-2">
                        {profile.percentage.toFixed(1)}%
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {profile.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {profile.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetake}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
            >
              Save Results
            </button>
          </div>
          
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            These results are based on the RIASEC model and your responses. Consider exploring the recommended careers further and speaking with a career counselor for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
