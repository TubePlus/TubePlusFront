import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
            <div className="container max-w mx-auto flex items-center justify-between gap-2">
                <Link href="/" className="flex gap-2 items-center">
                    {/* <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" /> */}{' '}
                    {/*TODO: import and configure svg logo*/}
                    <Image
                        alt="logo"
                        src="/images/tubePlus_logo.png"
                        width={32}
                        height={32}
                    />
                    <p className="hidden text-zinc-700 text-sm font-medium md:block">
                        MyComm
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
