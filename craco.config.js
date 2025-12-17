"use client";

import { ResponsiveDrawerSheet } from "@/components/responsive-drawer-sheet";
import { Badge } from "@repo/design-system";

interface MilestonesDrawerProps {
  trigger: React.ReactElement;
  currentPoints: number;
}

const MILESTONES = [
  { points: 15, earning_points: 5, challenge: "5k challenge" },
  { points: 30, earning_points: 10, challenge: "10k challenge" },
  { points: 75, earning_points: 25, challenge: "25k challenge" },
  { points: 150, earning_points: 50, challenge: "50k challenge" },
  { points: 300, earning_points: 100, challenge: "100k challenge" },
  { points: 600, earning_points: 200, challenge: "200k challenge" },
];

export default function MilestonesDrawer({ trigger, currentPoints }: MilestonesDrawerProps) {
  let activeIndex = 0;

  for (let i = 0; i < MILESTONES.length; i++) {
    const milestone = MILESTONES[i]!;

    if (currentPoints <= milestone.points) {
      activeIndex = i;
      break;
    }

    if (i === MILESTONES.length - 1) {
      activeIndex = i;
    }
  }

  return (
    <ResponsiveDrawerSheet
      trigger={trigger}
      title="Milestones"
      drawerClassName="w-full sm:min-w-[590px]! bg-hyro-card-bg"
      contentClassName="space-y-6 p-6 overflow-y-auto"
    >
      <div className="bg-hyro-secondary-card-bg border-hyro-neutral-400 space-y-3 rounded-lg border p-4">
        <h3 className="text-secondary-text text-sm font-semibold">Points rule:</h3>
        <p className="text-hyro-text-300 text-xs leading-relaxed">
          Points are granted when a user registers and buys a challenge using your invite link (only
          if they were not already registered with HyroTrader).
        </p>
      </div>

      <div className="space-y-3">
        {MILESTONES.map((milestone, index) => {
          const isClaimed = index < activeIndex;
          const isActive = index === activeIndex;

          return (
            <div
              key={milestone.points}
              className="border-hyro-neutral-400 flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    isClaimed
                      ? "bg-hyro-green-500 text-m"
                      : isActive
                        ? "bg-hyro-text-300"
                        : "bg-hyro-neutral-600"
                  }`}
                />
                <div className="space-y-1">
                  <p className="text-secondary-text text-sm font-medium">{milestone.challenge}</p>
                  <p className="text-hyro-text-300 text-xs">
                    Needs {milestone.points} points to claim
                  </p>
                </div>
              </div>

              {isClaimed ? (
                <Badge className="bg-hyro-green-700 border-hyro-green-600 text-hyro-green-400 rounded-full px-3 py-1 text-xs font-medium">
                  Claimed
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-hyro-secondary-bg text-hyro-text-300 bg-hyro-card-bg border text-xs font-medium"
                >
                  Earn {milestone.earning_points}pts
                </Badge>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-hyro-secondary-card-bg borderI think -hyro-neutral-400 space-y-3 rounded-lg border p-4">
        <h3 className="text-secondary-text text-sm font-semibold">Claiming:</h3>
        <p className="text-hyro-text-300 text-xs leading-relaxed">
          When you reach a milestone, the &quot;Claim&quot; button activates and you can redeem a
          free challenge.
        </p>
      </div>
    </ResponsiveDrawerSheet>
  );
}
