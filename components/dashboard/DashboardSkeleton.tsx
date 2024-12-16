import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="bg-white p-6 border border-primary/10 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-5 h-5 bg-gray-200 rounded" />
        <div className="w-20 h-4 bg-gray-200 rounded" />
      </div>
      <div className="space-y-2">
        <div className="w-12 h-8 bg-gray-200 rounded" />
        <div className="w-32 h-4 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 pt-4 border-t border-primary/10">
        <div className="w-40 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

const AppointmentItemSkeleton = () => {
  return (
    <div className="p-4 bg-white border border-primary/10 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="w-32 h-5 bg-gray-200 rounded" />
          <div className="w-40 h-4 bg-gray-200 rounded" />
        </div>
        <div className="w-20 h-6 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="w-24 h-4 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="w-20 h-8 bg-gray-200 rounded" />
        <div className="w-20 h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

const DocumentItemSkeleton = () => {
  return (
    <div className="p-4 bg-white border border-primary/10 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="w-40 h-5 bg-gray-200 rounded" />
            <div className="w-32 h-4 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded" />
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        <div className="w-20 h-8 bg-gray-200 rounded" />
        <div className="w-24 h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
        <div className="w-40 h-5 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Section */}
        <div className="space-y-4">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            <AppointmentItemSkeleton />
            <AppointmentItemSkeleton />
          </div>
        </div>

        {/* Documents Section */}
        <div className="space-y-4">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            <DocumentItemSkeleton />
            <DocumentItemSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;