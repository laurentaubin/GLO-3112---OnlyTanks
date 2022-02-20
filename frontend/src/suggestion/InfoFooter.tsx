import Link from "next/link";

const InfoFooter = () => {
  return (
    <div className="border-t border-t-gray-300 mt-4">
      <div className="flex justify-between text-gray-500 text-sm mt-4 xl:px-4">
        <Link href="/about/privacy">
          <a className="hover:underline">Privacy</a>
        </Link>
        <span className="px-1"> • </span>
        <Link href="/about/terms-of-service">
          <a className="whitespace-nowrap hover:underline"> Terms of Service</a>
        </Link>
        <span className="px-1"> • </span>
        <Link href="/about/contact">
          <a className="hover:underline">Contact</a>
        </Link>
      </div>
    </div>
  );
};

export default InfoFooter;
