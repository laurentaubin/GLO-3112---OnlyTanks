import { SectionTab, Tab } from "./SectionTab";
import TabTitle from "../TabTitle";

interface SectionTabListProps {
  tabs: Tab[];
  currentTab: TabTitle;
  onTabChange: (tab: Tab) => void;
}

export const SectionTabList = ({ tabs, currentTab, onTabChange }: SectionTabListProps) => {
  return (
    <div className="flex w-full justify-center md:gap-12 my-1">
      {tabs.map((tab) => (
        <SectionTab key={tab.title} tab={tab} isActive={currentTab === tab.title} onClick={onTabChange} />
      ))}
    </div>
  );
};
