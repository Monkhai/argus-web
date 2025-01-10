export default function ResourcesGridContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="grid h-full auto-rows-[250px] grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5">
        {children}
      </div>
    </div>
  );
}
