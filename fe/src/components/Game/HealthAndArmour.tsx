export default function HealthAndArmour({
  maxHealth,
  maxArmour,
  health,
  armour,
}: {
  maxHealth: number;
  maxArmour: number;
  health: number;
  armour: number;
}) {
  return (
    <>
      <div className="flex space-x-[1px]">
        {new Array(maxHealth).fill(0).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-xl py-[2px] ${
              i < health ? "bg-red-500" : "bg-transparent"
            } border border-red-[1px]`}
          ></div>
        ))}
      </div>
      <div className="flex space-x-[1px]">
        {new Array(maxArmour).fill(0).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-xl py-[2px] ${
              i < armour ? "bg-blue-500" : "bg-transparent"
            } border border-blue-[1px]`}
          ></div>
        ))}
      </div>
    </>
  );
}
