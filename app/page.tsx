import BoilerMiniNav from '@/components/BoilerMiniNav';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="w-screen h-screen">
            <div className="mx-auto">
                <div className="flex flex-col justify-center items-center mx-10 mt-10 z-10">
                    <h1 className="text-8xl font-bold">COMING</h1>
                    <h1 className="text-8xl font-bold">SOON</h1>
                    <p className="mt-5 mx-10 text-center text-xl">
                        잠시만 기다려주세요.
                        <br />곧 새로운 홈페이지로 찾아뵙겠습니다!
                    </p>

                    <BoilerMiniNav />
                </div>

                <Image
                    className="absolute top-10"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_74dd03e6ebde46ad8d20a9c8b222f870~mv2.gif'
                    }
                    width={68}
                    height={68}
                />
                <Image
                    className="absolute top-28 left-32 z-0"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_2e61ebde4b4b4fa2b9f09e10add2698d~mv2.gif'
                    }
                    width={34}
                    height={34}
                />
                <Image
                    className="absolute top-36 right-1"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_74dd03e6ebde46ad8d20a9c8b222f870~mv2.gif'
                    }
                    width={100}
                    height={100}
                />
                <Image
                    className="absolute top-80 right-24"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_74dd03e6ebde46ad8d20a9c8b222f870~mv2.gif'
                    }
                    width={40}
                    height={40}
                />
                <Image
                    className="absolute bottom-44 left-10"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_74dd03e6ebde46ad8d20a9c8b222f870~mv2.gif'
                    }
                    width={40}
                    height={40}
                />
                <Image
                    className="absolute bottom-20 left-24"
                    alt="bg_plus"
                    src={
                        '/images/underConstruction/45d10e_2e61ebde4b4b4fa2b9f09e10add2698d~mv2.gif'
                    }
                    width={100}
                    height={100}
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
        </div>
    );
}
