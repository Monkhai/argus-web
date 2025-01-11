export default function ResourcesGridContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="grid h-full w-full auto-rows-[250px] grid-cols-1 gap-4 overflow-y-auto px-4 pb-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-2 lg:px-8 xl:grid-cols-5">
        {children}
      </div>
    </div>
  );
}
