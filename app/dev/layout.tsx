export default function DevLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <div className="w-screen h-screen">
            {children}
            {modal}
        </div>
    );
}
