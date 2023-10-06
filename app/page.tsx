import { buttonVariants } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className="relative">
                <div className="container flex flex-col justify-center items-center my-10">
                    <h1 className="text-8xl font-bold">COMING</h1>
                    <h1 className="text-8xl font-bold">SOON</h1>
                    <p className="mt-5 mx-10 text-center text-xl">
                        잠시만 기다려주세요.
                        <br />곧 새로운 홈페이지로 찾아뵙겠습니다!
                    </p>
                </div>
                <Link
                    className={buttonVariants({ className: 'w-full' })}
                    href="https://www.notion.so/TubePlus-9183790a57494cacbfe6164f9929b0ad?pvs=4">
                    About tubePlus
                </Link>

                <Image
                    className="absolute top-0"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_74dd03e6ebde46ad8d20a9c8b222f870~mv2.gif'
                    }
                    width={68}
                    height={68}
                />
                <Image
                    className="absolute bottom-12 right-0"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_2e61ebde4b4b4fa2b9f09e10add2698d~mv2.gif'
                    }
                    width={68}
                    height={68}
                />
            </div>
        </>
    );
}
