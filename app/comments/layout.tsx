export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`m-auto
                  desktop:gap-unit-lg tablet:gap-unit-md mobileL:gap-unit-md mobileM:gap-unit-sm
                  desktop:max-w-[1524px] tablet:max-w-[1024px] mobileL:max-w-[640px] mobileM:max-w-[640px]`}
                  style={{
                    overflowY: 'visible',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh'  // 뷰포트 높이를 100%로 설정
                  }}
      >
        {children}
    </div>
  );
}
