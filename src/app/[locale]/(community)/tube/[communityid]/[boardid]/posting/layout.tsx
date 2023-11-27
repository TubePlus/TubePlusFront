export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <section
      className={`m-auto
                  desktop:gap-unit-lg tablet:gap-unit-md mobileL:gap-unit-md mobileM:gap-unit-sm
                  desktop:max-w-[1524px] tablet:max-w-[1024px] mobileL:max-w-[640px] mobileM:max-w-[640px]`}
    >
      {children}
    </section>
    </>
  );
}
