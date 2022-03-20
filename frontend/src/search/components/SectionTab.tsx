export interface Tab {
  title: string;
  href: string;
}

interface SectionTabProps {
  tab: Tab;
  isActive?: boolean;
  key?: string;
  onClick: (tab: Tab) => void;
}

export const SectionTab = ({ tab, isActive, onClick }: SectionTabProps) => {
  return (
    <button onClick={() => onClick(tab)}>
      <div key={tab.title} className={["flex  px-4 text-center ", isActive ? "text-black" : "text-gray-500 hover:text-gray-700"].join(" ")}>
        <p className="text-xl font-semibold">{tab.title}</p>
      </div>
      <div className="relative h-2 overflow-hidden">
        {isActive && <div className="relative top-[50%] h-2 w-full rounded-full bg-blue-primary" />}
      </div>
    </button>
  );
};
