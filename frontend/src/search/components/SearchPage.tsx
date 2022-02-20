import { useRouter } from "next/router";
import { ReactNode } from "react";
import { SearchBar } from "./SearchBar";
import { Tab } from "./SectionTab";
import { SectionTabList } from "./SectionTabList";
import TabTitle from "../TabTitle";

const tabs: Tab[] = [
  {
    title: TabTitle.USERS,
    href: "/search/users"
  },
  {
    title: TabTitle.POSTS,
    href: "/search/posts"
  },
  {
    title: TabTitle.HASHTAGS,
    href: "/search/hashtags"
  }
];

interface Props {
  currentTab: TabTitle;
  children?: ReactNode;
}

export const SearchPage = ({ currentTab, children }: Props) => {
  const router = useRouter();

  const onTabChange = (tab: Tab) => {
    router.push(`/${tab.href}`);
  };

  return (
    <div className="mt-12">
      <SectionTabList tabs={tabs} currentTab={currentTab} onTabChange={onTabChange} />
      <div className="mt-6">
        <SearchBar />
        {children}
      </div>
    </div>
  );
};
