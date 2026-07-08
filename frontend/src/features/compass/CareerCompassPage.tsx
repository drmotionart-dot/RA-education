import { useState } from 'react';
import { Compass, DollarSign, Clock, Filter } from 'lucide-react';
import { PathwayComparator } from './PathwayComparator';
import { CostCalculator } from './CostCalculator';
import { TimelineVisualizer } from './TimelineVisualizer';
import { SmartPathFinder } from './SmartPathFinder';

type Tab = 'comparator' | 'cost' | 'timeline' | 'finder';

const tabs: { id: Tab; label: string; icon: typeof Compass }[] = [
  { id: 'comparator', label: 'Pathway Comparator', icon: Compass },
  { id: 'cost', label: 'Cost Calculator', icon: DollarSign },
  { id: 'timeline', label: 'Timeline Visualizer', icon: Clock },
  { id: 'finder', label: 'Smart Path Finder', icon: Filter },
];

export function CareerCompassPage() {
  const [activeTab, setActiveTab] = useState<Tab>('comparator');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Medical Career Compass</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Compare pathways, calculate costs, visualize timelines, and find your ideal career path.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'comparator' && <PathwayComparator />}
      {activeTab === 'cost' && <CostCalculator />}
      {activeTab === 'timeline' && <TimelineVisualizer />}
      {activeTab === 'finder' && <SmartPathFinder />}
    </div>
  );
}
