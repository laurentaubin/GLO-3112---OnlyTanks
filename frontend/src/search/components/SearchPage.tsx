import { useRouter } from "next/router";
import { ReactNode } from "react";
import { SingleInputSearchBar } from "./SingleInputSearchBar";
import { Tab } from "./SectionTab";
import { SectionTabList } from "./SectionTabList";
import TabTitle from "../TabTitle";
import MultipleInputsSearchBar from "./MultipleInputsSearchBar";

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
  placeholder: string;
  children?: ReactNode;
  singleInputSearch?: (input: string) => void;
  multipleInputsSearch?: (inputs: string[]) => void;
}

export const SearchPage = ({ currentTab, placeholder, children, singleInputSearch, multipleInputsSearch }: Props) => {
  const router = useRouter();

  const onTabChange = (tab: Tab) => {
    router.push(tab.href);
  };

  return (
    <div className="mt-12">
      <SectionTabList tabs={tabs} currentTab={currentTab} onTabChange={onTabChange} />
      <div className="mt-6">
        {multipleInputsSearch && <MultipleInputsSearchBar search={multipleInputsSearch} placeholder={placeholder} />}
        {singleInputSearch && <SingleInputSearchBar search={singleInputSearch} placeholder={placeholder} />}
        {children}
      </div>
    </div>
  );
};
